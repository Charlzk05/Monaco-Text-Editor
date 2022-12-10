const languageInputBox = document.getElementById("languageInputBox");
const languageListsMenu = document.getElementById("languageListsMenu");
const fileNameInputBox = document.getElementById("fileNameInputBox");

var editor;
var value = '';
var language = "javascript";
var theme = "vs-dark";
var fontsize = 14;

require(["./vs/editor/editor.main"], () => {
    editor = monaco.editor.create(document.getElementById("container"), {
        value: value,
        language: language,
        theme: theme,
        automaticLayout: true,
        fontSize: fontsize
    });
});

function getValue() {
    return editor.getValue();
}

function setValue(content) {
    editor.setValue(content);
}

function ZoomInButton_Click() {
    if (fontsize != 24) {
        fontsize += 2;
        editor.updateOptions({
            fontSize: fontsize
        });
    }
}

function ZoomOutButton_Click() {
    if (fontsize != 2) {
        fontsize -= 2;
        editor.updateOptions({
            fontSize: fontsize
        });
    }
}

function UpperCaseButton_Click() {
    setValue(getValue().toUpperCase());
}

function LowerCaseButton_Click() {
    setValue(getValue().toLowerCase());
}

function ClearTextButton_Click() {
    setValue("");
}

function SetLanguageButton_Click() {
    monaco.editor.setModelLanguage(editor.getModel(), languageInputBox.value);
}

var isLangListHidden = true;
function CloseLangListButton_Click() {
    isLangListHidden = true;
    languageListsMenu.setAttribute("class", "languageListsContainerHidden");
}

function LanguageListButton_Click() {
    if (isLangListHidden == true) {
        isLangListHidden = false;
        languageListsMenu.setAttribute("class", "languageListsContainerVisible");
    } else {
        isLangListHidden = true;
        languageListsMenu.setAttribute("class", "languageListsContainerHidden");
    }
}

function downloadFunc() {
    if (fileNameInputBox.value.includes(".")) {
        var aDownload = document.createElement("a");
        aDownload.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(getValue()));
        aDownload.setAttribute("download", fileNameInputBox.value.replace(/[/\\?%*:|"<>]/g, "-"));
        aDownload.style.display = "none";
        document.body.appendChild(aDownload);
        aDownload.click();
        document.body.removeChild(aDownload);
    } else {
        var aDownload = document.createElement("a");
        aDownload.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(getValue()));
        aDownload.setAttribute("download", fileNameInputBox.value.replace(/[/\\?%*:|"<>]/g, "-") + ".txt");
        aDownload.style.display = "none";
        document.body.appendChild(aDownload);
        aDownload.click();
        document.body.removeChild(aDownload);
    }
}

function DownloadButton_Click() {
    downloadFunc();
}

fileNameInputBox.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        downloadFunc();
    }
});

languageInputBox.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        monaco.editor.setModelLanguage(editor.getModel(), languageInputBox.value);
    }
});