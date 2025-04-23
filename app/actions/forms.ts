"use server"

import { Form, FormField } from "@/forms_builder/types"

interface JotFormQuestion {
    name: string
    order: string
    qid: string
    text: string
    type: string
    required?: string | boolean
    validation?: string
    readonly?: string | boolean
    defaultValue?: string
    description?: string
    options?: string
    subHeader?: string
    hint?: string
    sublabels?: Record<string, string>
    special?: string
    // Matrix specific fields
    mcolumns?: string
    mrows?: string
    // Widget specific fields
    fields?: string
    minRowsNumber?: string
    // Signature specific fields
    height?: string
    width?: string
}

interface JotFormApiResponse {
    responseCode: number
    message: string
    content: Record<string, JotFormQuestion>
    duration: string
    "limit-left": number
}

function mapJotFormFieldType(type: string): FormField["type"] {
    const typeMap: Record<string, FormField["type"]> = {
        control_textbox: "shortAnswer",
        control_textarea: "longAnswer",
        control_email: "email",
        control_radio: "multipleChoice",
        control_yesno: "yesNo",
        control_rating: "npsRating",
        control_signature: "signature",
        control_fullname: "shortAnswer",
        control_address: "longAnswer",
        control_text: "paragraph",
        control_datetime: "date",
        control_phone: "shortAnswer",
        control_dropdown: "multipleChoice",
        control_matrix: "longAnswer", // We'll convert matrix to a formatted text area
        control_widget: "longAnswer", // Convert configurable list widget to text area
        control_head: "paragraph", // Convert headers to paragraphs
        control_button: "paragraph", // Convert buttons to hidden paragraphs
    }

    return typeMap[type] || "shortAnswer"
}

function parseJotFormOptions(options: string): string[] {
    try {
        const parsedOptions = JSON.parse(options)
        if (Array.isArray(parsedOptions)) {
            return parsedOptions.map((opt: any) =>
                typeof opt === "string" ? opt : opt.text || opt.value || String(opt)
            )
        }
        return Object.values(parsedOptions).map(String)
    } catch {
        return options.split('|').filter(Boolean)
    }
}

function convertJotFormToBuilderForm(formData: Record<string, JotFormQuestion>): Form {
    const fields: FormField[] = []
    let formTitle = "Form"
    let formDescription = ""

    // Sort questions by order
    const sortedQuestions = Object.values(formData)
        .sort((a, b) => parseInt(a.order) - parseInt(b.order))

    for (const question of sortedQuestions) {
        // Handle header type questions
        if (question.type === "control_head") {
            formTitle = question.text || formTitle
            formDescription = question.subHeader || formDescription
            continue
        }

        // Skip button type questions
        if (question.type === "control_button") {
            continue
        }


        const fieldType = mapJotFormFieldType(question.type) ?? "paragraph"

        // Handle paragraphs
        if (question.type === "control_text") {
            fields.push({
                id: question.qid,
                type: "paragraph",
                label: "",
                required: question.required === "Yes",
                properties: {
                    placeholder: "Fill in the matrix data",
                    minLength: 0,
                    maxLength: 2000,
                    text: question.text
                }
            })

            continue
        }

        // Special handling for matrix fields
        if (question.type === "control_matrix") {
            const columns = question.mcolumns?.split('|').map(c => c.trim()) || []
            const rows = question.mrows?.split('|').map(r => r.trim()) || []
            const matrixText = `${question.text}\n\n` +
                `Columns: ${columns.join(', ')}\n` +
                `Rows: ${rows.join(', ')}`

            fields.push({
                id: question.qid,
                type: "longAnswer",
                label: question.text,
                required: question.required === "Yes",
                properties: {
                    placeholder: "Fill in the matrix data",
                    minLength: 0,
                    maxLength: 2000,
                    text: matrixText
                }
            })
            continue
        }

        // Special handling for configurable list widgets
        if (question.type === "control_widget") {
            const widgetFields = question.fields?.split('\n').filter(Boolean) || []
            const widgetText = `${question.text}\n\n` +
                `Fields: ${widgetFields.join(', ')}\n` +
                `Minimum Rows: ${question.minRowsNumber || '1'}`

            fields.push({
                id: question.qid,
                type: "longAnswer",
                label: question.text,
                required: question.required === "Yes",
                properties: {
                    placeholder: "Fill in the list data",
                    minLength: 0,
                    maxLength: 2000,
                    text: widgetText
                }
            })
            continue
        }

        const field: FormField = {
            id: question.qid,
            type: fieldType,
            label: question.text || question.name,
            required: question.required === "Yes",
            properties: {
                placeholder: question.hint || `Enter ${question.text?.toLowerCase() || question.name.toLowerCase()}`,
                minLength: 0,
                maxLength: fieldType === "shortAnswer" ? 1000 : 2000,
            }
        }

        // Handle sublabels for compound fields
        if (question.sublabels) {
            field.properties.text = Object.entries(question.sublabels)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n')
        }

        // Handle options for dropdown/multiple choice questions
        if (question.type === "control_dropdown" && question.special === "Gender") {
            field.properties.choices = ["Male", "Female", "Other", "Prefer not to say"]
        } else if (question.options) {
            field.properties.choices = parseJotFormOptions(question.options)
        }

        fields.push(field)
    }

    return {
        id: formTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        title: formTitle,
        description: formDescription,
        fields,
        theme: {
            id: formTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: formTitle,
            description: formDescription,
            colors: {
                primary: "rgb(var(--primary))",
                secondary: "rgb(var(--muted-foreground))",
                accent: "rgb(var(--accent))",
                background: "transparent",
                surface: "rgb(var(--card))",
                text: "rgb(var(--foreground))"
            },
            font: "Inter"
        }
    }
}

export async function getJotFormById(formId: string): Promise<Form> {
    const apiKey = process.env.JOTFORM_API_KEY
    if (!apiKey) {
        throw new Error("JOTFORM_API_KEY is not set in environment variables")
    }

    const response = await fetch(
        `https://eu-api.jotform.com/form/${formId}/questions?apiKey=${apiKey}`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    )

    if (!response.ok) {
        throw new Error(`Failed to fetch form: ${response.statusText}`)
    }

    const data: JotFormApiResponse = await response.json()
    if (data.responseCode !== 200) {
        throw new Error(data.message || "Failed to fetch form data")
    }

    return convertJotFormToBuilderForm(data.content)
} 