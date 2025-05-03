"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/lib/auth/auth-context";
import { Award, MessageSquare, PlusCircle } from "lucide-react";

export default function AppPage() {
    const { user } = useAuth()
    if(!user) {
        return null;
    }
    return (
        <>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Alert
                    variant="default"
                    className="mb-12"
                >
                    <AlertTitle>
                        Welcome back, {user.first_name} {user.last_name}
                    </AlertTitle>
                    <AlertDescription>
                        Your profile is 85% complete. Finish setting up your profile to increase your chances of getting shifts.
                    </AlertDescription>
                </Alert>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-slate-12 font-semibold">
                                Upcoming Shifts
                            </h2>
                            <div className="flex flex-col gap-4 border border-slate-6 bg-slate-4 p-8 border-dashed justify-between items-center">
                                <div className="max-w-96 w-full flex flex-col items-center">
                                    <p className="text-slate-11 mb-2">You are currently <span className="font-bold">60%</span> compliant.</p>
                                    <Progress value={60} />
                                </div>
                                <p className="text-slate-10 text-sm">
                                    You have 12 items that need attention.
                                </p>
                                <Button>
                                    Submit documents
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>
                                    Compliance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center p-2 bg-slate-3 rounded-md">
                                        <span className="text-sm text-slate-11">COVID-19 Vaccination</span>
                                        <Badge variant="destructive">Missing</Badge>
                                    </div>
                                    <div className="flex justify-between items-center p-2 bg-slate-3 rounded-md">
                                        <span className="text-sm text-slate-11">COVID-19 Vaccination</span>
                                        <Badge variant="warning">Incomplete</Badge>
                                    </div>
                                </div>
                                <div className="flex justify-between text-sm mb-1 mt-4">
                                    <span className="text-slate-11">85% complete</span>
                                    <span className="text-primary-9 font-medium">17/20</span>
                                </div>
                                <Progress value={60} />
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline">
                                    Submit documents
                                </Button>
                            </CardFooter>

                        </Card>
                        <Card className="mb-8">
                            <CardHeader className="flex items-center">
                                <CardTitle >Trainings</CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-11">Registered Nurse (RN)</span>
                                    <Badge variant="success">Active</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-11">Basic Life Support (BLS)</span>
                                    <Badge variant="success">Active</Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-11">Advanced Cardiac Life Support</span>
                                    <Badge variant="warning">Expiring Soon</Badge>
                                </div>
                            </CardContent>

                            <CardFooter>
                                <Button className="w-full" variant="outline">
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    Add Certification
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border border-dashed bg-slate-4">
                            <CardHeader className="flex items-center">
                                <CardTitle className="text-lg font-semibold text-slate-12">Support</CardTitle>
                            </CardHeader>

                            <CardContent>
                                <p className="text-sm text-slate-11">
                                    Need help with your account or have questions about shifts?
                                </p>

                            </CardContent>
                            <CardFooter>
                                <Button variant="link">
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Contact Support
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </main>
        </>
    )
}
