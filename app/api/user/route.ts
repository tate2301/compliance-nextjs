import { NextRequest, NextResponse } from 'next/server';
import { getServerSession }          from 'next-auth/next';
import { authOptions }               from '@/app/api/auth/[...nextauth]/route';

import dbConnect        from '@/lib/db/mongoose';
import ComplianceUser   from '@/lib/db/models/user';
import {requireSession} from "@/lib/auth/acl";

/* ─────────── helpers ─────────── */


/* ─────────── GET /api/user/[_id?] ─────────── */

export async function GET(
    req: NextRequest,
) {
  try {
    const session = await requireSession(req);
    await dbConnect();

    // if no id provided, default to “me”
    const id = session.user.id;

    // 🔒 tenant isolation—remove if not needed
    const user = await ComplianceUser.findOne({
      _id: id,
      tenant: session.user.tenantId
    }).exec();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof NextResponse) return err;        // bubbled 401
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/* ─────────── POST /api/user  (create/update self) ─────────── */

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession(req);
    await dbConnect();

    const body = await req.json();
    const { firstName, lastName, ...rest } = body;

    if (!firstName || !lastName) {
      return NextResponse.json(
          { error: 'firstName & lastName required' },
          { status: 400 }
      );
    }

    const user = await ComplianceUser.findOneAndUpdate(
        { _id: session.user.id, tenant: session.user.tenantId },
        { firstName, lastName, ...rest },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof NextResponse) return err;
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

/* ─────────── PUT /api/user/onboarding ─────────── */

export async function PUT(req: NextRequest) {
  try {
    const session = await requireSession(req);
    await dbConnect();

    const { onboardingStatus } = await req.json();
    if (!onboardingStatus) {
      return NextResponse.json(
          { error: 'onboardingStatus required' },
          { status: 400 }
      );
    }

    const user = await ComplianceUser.findOne({
      _id: session.user.id,
      tenant: session.user.tenantId
    }).exec();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.onboardingStatus = {
      ...user.onboardingStatus,
      ...onboardingStatus,
      lastUpdated: new Date()
    };
    await user.save();

    return NextResponse.json(user);
  } catch (err) {
    if (err instanceof NextResponse) return err;
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
