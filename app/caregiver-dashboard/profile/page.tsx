import ProfileForm from '../profile-form'

export default function ProfilePage() {
    return (
        <div className="min-h-screen p-6 pt-0">
            <div className="max-w-4xl mx-auto">
                <div className="py-4 mb-6">
                    <h1 className="text-2xl font-bold text-slate-12">Profile Information</h1>
                    <p className="text-slate-11">Update your personal and professional information</p>
                </div>

                <ProfileForm />
            </div>
        </div>
    )
} 