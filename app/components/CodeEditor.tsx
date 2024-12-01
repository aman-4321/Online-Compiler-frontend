"use client";

import React, { useState } from "react";
import ReactCodeMirror from "@uiw/react-codemirror";
import { Moon, Sun, Play } from "lucide-react";
import { useTheme } from "next-themes";
import { githubLight } from "@uiw/codemirror-theme-github";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { LANGUAGES } from "@/languages";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const CodeEditor: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("python");
  const [code, setCode] = useState<string>(LANGUAGES["python"].defaultCode);
  const [output, setOutput] = useState<string>("");
  const { setTheme, resolvedTheme } = useTheme();

  const runCode = () => {
    try {
      setOutput("Code execution simulation:\nOutput would appear here");
    } catch (error) {
      setOutput(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  type LanguageIcon = "python" | "javascript" | "go" | "php" | "rust" | "cpp";

  const languageIcons = {
    python: "/python.svg",
    javascript: "/javascript.svg",
    go: "/go.svg",
    php: "/php.svg",
    rust: "/rust.svg",
    cpp: "/cpp.svg",
  };

  return (
    <div
      className={`min-h-screen flex ${resolvedTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}
    >
      <aside className="w-16 bg-gray-100 dark:bg-gray-800 flex flex-col items-center py-4 border-r border-gray-200 dark:border-gray-700">
        <TooltipProvider>
          {Object.entries(LANGUAGES).map(([lang, { name }]) => (
            <Tooltip key={lang}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`mb-2 ${currentLanguage === lang ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                  onClick={() => {
                    setCurrentLanguage(lang);
                    setCode(LANGUAGES[lang].defaultCode);
                  }}
                >
                  <Image
                    src={languageIcons[lang as LanguageIcon]}
                    alt={name}
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                  <span className="sr-only">{name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Programiz-like Compiler</h1>
        </header>

        <div className="flex-1 flex">
          <div className="w-3/5 border-r border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <span className="text-sm font-medium">
                {LANGUAGES[currentLanguage].name}
              </span>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  {resolvedTheme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span className="sr-only">Toggle theme</span>
                </Button>
                <Button size="sm" onClick={runCode}>
                  <Play className="h-4 w-4 mr-2" />
                  Run
                </Button>
              </div>
            </div>
            <ReactCodeMirror
              extensions={[LANGUAGES[currentLanguage].extension]}
              theme={resolvedTheme === "dark" ? dracula : githubLight}
              value={code}
              onChange={(value) => setCode(value)}
              className="h-[calc(100vh-6rem)]"
            />
          </div>

          <div className="w-2/5 flex flex-col">
            <div className="flex-1 p-4 overflow-auto">
              <h2 className="text-lg font-semibold mb-2">Output</h2>
              <pre className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md overflow-auto h-full">
                {output || "Run code to see output"}
              </pre>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CodeEditor;
