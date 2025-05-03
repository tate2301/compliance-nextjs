import { useAuth } from "@/lib/auth/auth-context"
import { useState } from "react"
import { complianceService } from "../services/compliance"
import { toast } from "sonner"
import { saveAs } from 'file-saver';

export const useExportProfile = () => {
    const { user } = useAuth()
    const [isDownloading, setIsDownloading] = useState<boolean>(false)

    const downloadProfile = async (provider: "elysium" | 'cygnet') => {
        if (!user) {
            throw Error("Unauthorized")
        }
        setIsDownloading(true)
        try {
            const name = `${user?.first_name}_${provider}_profile_${new Date().toISOString()}.docx`.replace(" ", "_")
            const response = await complianceService.generateProfile(user.id, provider)
            if (response.status === 200) {
                return saveAs(response.data, name)
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to download profile")
        } finally {
            setIsDownloading(false)
        }
    }

    const downloadElysiumProfile = () => downloadProfile("elysium")


    const downloadCygnetProfile = () => downloadProfile("cygnet")

    return {
        downloadElysiumProfile,
        downloadCygnetProfile,
        isDownloading
    }
}