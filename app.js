const passwordLengthInput = document.querySelector("#password-length");
const passwordLengthText = document.querySelector("#password-length-txt");
const checkboxes = document.querySelectorAll(".checkbox");
console.log(checkboxes);
const smallLettersCheckbox = document.querySelector("#smallLetters");
const bigLettersCheckbox = document.querySelector("#bigLetters");
const numbersCheckbox = document.querySelector("#numbers");
const generatedPasswordText = document.querySelector("#generated-password");
const copyToClipboardBtn = document.querySelector("#copy-to-clipboard");
const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
const letters = caps.map(letter => letter.toLowerCase());
const numbers = [1,2,3,4,5,6,7,8,9,0];
const generate = passwordLength => {
    let charset = 
        (bigLettersCheckbox.checked && smallLettersCheckbox.checked && numbersCheckbox.checked) ? 
            [...caps, ...letters, ...numbers] :
        (bigLettersCheckbox.checked && smallLettersCheckbox.checked) ?
            [...caps, ...letters] :
        (bigLettersCheckbox.checked && numbersCheckbox.checked) ?
            [...caps, ...numbers] :
        (numbersCheckbox.checked && smallLettersCheckbox.checked) ?
            [...letters, ...numbers]:
        (numbersCheckbox.checked) ?
            numbers:
        (bigLettersCheckbox.checked) ?
            caps:
        (smallLettersCheckbox.checked) ?
            letters:""
        ;
    let generatedPassword = [];
    for (let i = 0; i < passwordLength; i++) {
        generatedPassword.push(charset[Math.floor(Math.random()*charset.length)]);
    }
    return generatedPassword.join("");
}
passwordLengthInput.oninput = ()=>{
    passwordLengthText.innerText = "Password length: " + passwordLengthInput.value;
    generatedPasswordText.value = generate(passwordLengthInput.value);
}
generatedPasswordText.value = generate(passwordLengthInput.value);

copyToClipboardBtn.addEventListener("click", async ()=>{
    try{
        await navigator.clipboard.writeText(generatedPasswordText.value);
        copyToClipboardBtn.innerText = "Copied to clipboard!";
        setTimeout(() => {
            copyToClipboardBtn.innerText = "Copy password to clipboard";
        }, 2000);
    }catch(err){
        copyToClipboardBtn.innerText = "Failed to copy: "+err;
    }
})
checkboxes.forEach(checkbox=>{
    checkbox.addEventListener('click', ()=>{
        generatedPasswordText.value = generate(passwordLengthInput.value);
    })
})