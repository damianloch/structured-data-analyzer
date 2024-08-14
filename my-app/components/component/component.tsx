"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleFileSubmit = async () => {
    if (!file) {
      setError("Please upload a file before asking a question.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setError(null);
        console.log("File uploaded successfully:", result);
      } else {
        setError(result.error || "Failed to upload file");
      }
    } catch (err) {
      setError("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionSubmit = async () => {
    if (!file) {
      setError("Please upload a file before asking a question.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/submit-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: question }),
      });

      const result = await response.json();
      if (response.ok) {
        setAnswer(result.response);
        setError(null);
      } else {
        setError(result.error || "Failed to get a response");
      }
    } catch (err) {
      setError("An error occurred while submitting the question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="w-full max-w-3xl rounded-2xl bg-card p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Data Explorer</h1>
          <Button variant="outline" size="sm" onClick={handleFileSubmit}>
            {loading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
        <div className="mb-6 flex items-center justify-center">
          {file ? (
            <div className="flex items-center gap-4">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {file.type}, {file.size} bytes
                </p>
              </div>
            </div>
          ) : (
            <div>
              <input type="file" onChange={handleFileUpload} />
            </div>
          )}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuestionSubmit();
          }}
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
            {loading ? "Processing..." : "Submit"}
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
