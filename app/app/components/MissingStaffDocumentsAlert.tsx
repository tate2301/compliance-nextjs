import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { StaffDocument } from "@/lib/types";
import Link from "next/link";

export const MissingStaffDocumentsAlert = (props: {
  missingDocuments: string[];
  userFullname: string;
}) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTitle>
        Hi {props.userFullname}, you have missing documents.
      </AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          Your compliance score is being affected by the following missing
          documents. Please upload new documents to avoid inconviences.
        </p>
        <ul className="list-decimal list-inside p-2 space-y-1 bg-error-1 border border-error-6 border-dashed w-full">
          {props.missingDocuments?.map((doc) => (
            <li key={doc} className="font-semibold">
              {doc}
            </li>
          ))}
        </ul>
        <Button asChild variant="destructive" className="mt-4">
          <Link href={"/app/documents/resolve"}>Resolve issues</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};
