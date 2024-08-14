"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Placeholder function for analyzing the file and answering the question
async function analyzeFileAndAnswerQuestion(
  file: File,
  question: string
): Promise<string> {
  // Add your logic here
  return "This is the answer";
}

export function Component() {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "application/vnd.ms-excel" ||
        uploadedFile.type === "text/csv")
    ) {
      setFile(uploadedFile);
      setError(null);
    } else {
      setFile(null);
      setError("Please upload a valid Excel or CSV file.");
    }
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a file before asking a question.");
      return;
    }
    setLoading(true);
    try {
      const answer = await analyzeFileAndAnswerQuestion(file, question);
      setAnswer(answer);
    } catch (err) {
      setError("Sorry, we could not answer your question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="w-full max-w-3xl rounded-2xl bg-card p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Data Explorer</h1>
          <Button variant="outline" size="sm">
            Save Uploads
          </Button>
        </div>
        <div className="mb-6 flex items-center justify-center">
          {file ? (
            <div className="flex items-center gap-4">
              <FileIcon className="h-8 w-8" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {file.type}, {file.size} bytes
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col items-center justify-center gap-2">
                <UploadIcon className="h-8 w-8" />
                <p>Drag and drop a file or click to upload</p>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleQuestionSubmit}
          className="mb-6 flex items-center gap-4"
        >
          <Input
            type="text"
            placeholder="Ask a question about your data..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderPinwheelIcon className="h-5 w-5 animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
        <div className="flex flex-col gap-4">
          {error && (
            <div className="rounded-lg bg-red-100 p-4 text-red-900">
              <p>{error}</p>
            </div>
          )}
          {answer && (
            <div className="rounded-lg bg-primary p-4 text-primary-foreground">
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function LoaderPinwheelIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5" />
      <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
      <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function UploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
