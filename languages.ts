import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { javascript } from "@codemirror/lang-javascript";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { LanguageSupport } from "@codemirror/language";

interface LanguageConfig {
  name: string;
  extension: LanguageSupport;
  defaultCode: string;
}

export const LANGUAGES: Record<string, LanguageConfig> = {
  python: {
    name: "Python",
    extension: python(),
    defaultCode: `# Welcome to Python Code Editor
def hello_world():
    print("Hello, World!")
hello_world()`,
  },
  javascript: {
    name: "JavaScript",
    extension: javascript(),
    defaultCode: `// Welcome to JavaScript Code Editor
function helloWorld() {
    console.log("Hello, World!");
}
helloWorld();`,
  },
  go: {
    name: "Go",
    extension: go(),
    defaultCode: `// Welcome to Go Code Editor
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  },
  php: {
    name: "PHP",
    extension: php(),
    defaultCode: `<?php
// Welcome to PHP Code Editor
function helloWorld() {
    echo "Hello, World!";
}
helloWorld();
?>`,
  },
  rust: {
    name: "Rust",
    extension: rust(),
    defaultCode: `// Welcome to Rust Code Editor
fn main() {
    println!("Hello, World!");
}`,
  },
  cpp: {
    name: "C++",
    extension: cpp(),
    defaultCode: `// Welcome to C++ Code Editor
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  },
};
