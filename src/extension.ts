import * as vscode from "vscode";

const languages = ["typescript", "typescriptreact"] as const;

export function activate(context: vscode.ExtensionContext) {
  console.log("activated");

  const hoverProvider: vscode.HoverProvider = {
    provideHover(document, position, token) {
      if (vscode.window.activeTextEditor !== undefined) {
        const Uri = vscode.window.activeTextEditor.document.uri;
        const cursorPosition = vscode.window.activeTextEditor.selection.active;

        vscode.commands
          .executeCommand("vscode.executeHoverProvider", Uri, cursorPosition)
          .then((a: any) => {
            console.log(a[0].contents[0].value);
          });
      }

      return {
        contents: ["hover content"],
      };
    },
  };

  context.subscriptions.push(
    ...languages.map((language) => {
      return vscode.languages.registerHoverProvider(
        {
          language,
        },
        hoverProvider,
      );
    }),
  );
}

export function deactivate() {}
