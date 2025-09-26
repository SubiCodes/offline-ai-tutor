import * as FileSystem from "expo-file-system";
import { extractTextFromPdf } from "@/api/extractTextFromPdf";

type PickedFile = {
    uri: string;
    name: string;
    mimeType?: string;
};

type ExtractedTextResult = {
    text?: string;
    success: boolean;
    error?: string;
}

export async function extractTextFromFile(file: PickedFile): Promise<ExtractedTextResult> {
    const { uri, mimeType, name } = file;

    try {
        // ---- TXT ----
        if (mimeType === "text/plain" || name.endsWith(".txt")) {
            const text = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.UTF8,
            });
            return { text: text, success: true };
        }

        // ---- PDF ----
        if (mimeType === "application/pdf" || name.toLowerCase().endsWith(".pdf")) {
           const res = await extractTextFromPdf(file);
           return res;
        }

        // ---- DOC / DOCX ----
        if (
            mimeType === "application/msword" ||
            mimeType ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            name.toLowerCase().endsWith(".doc") ||
            name.toLowerCase().endsWith(".docx")
        ) {
            //   return "[⚠ DOC/DOCX parsing not implemented. Please upload .txt for now]";
        }

        // ---- Unsupported ----
        return { success: false, error: "Unsupported file type. Please upload a .txt file." };
    } catch (error) {
        console.error("❌ Error extracting text:", error);
        return { success: false, error: "Unable to parse uploaded file" };;
    }
}
