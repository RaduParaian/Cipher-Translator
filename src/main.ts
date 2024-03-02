const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '(', ')', '{', '}', '[', ']', '.', ',', '!', '?', ';', ':', '_', '-', '/', '@', '&', '#', "%", '*', '£', '$', '^', '~', '"', `'`, '+', '=', '<', '>', ' '];
const charsList = [...chars];
const keyJp = ['タ', 'キ', 'ヲ', 'ホ', 'ア', 'ロ', 'ナ', 'ら', 'モ', 'と', 'た', 'そ', 'お', 'メ', 'も', 'ね', 'チ', 'ひ', 'せ', 'う', 'ル', 'ヤ', 'ヘ', 'ワ', 'こ', 'オ', 'な', 'ツ', 'ハ', 'ゐ', 'や', 'ウ', 'ヰ', 'テ', 'ニ', 'き', 'け', 'イ', 'ケ', 'ヨ', 'ミ', 'ヒ', 'ゆ', 'ほ', 'カ', 'て', 'リ', 'ま', 'ム', 'ヌ', 'を', 'フ', 'ス', 'ソ', 'え', 'ラ', 'ぬ', 'い', 'つ', 'ゑ', 'く', 'る', 'れ', 'し', 'の', 'わ', 'マ', 'ト', 'す', 'ち', 'レ', 'あ', 'エ', 'よ', 'ヱ', 'サ', 'か', 'セ', 'め', 'ユ', 'ク', 'さ', 'は', 'む', 'に', 'ろ', 'み', 'り', 'ふ', 'ネ', 'ノ', 'コ', 'シ'];
const keySh = ['t', 'u', '0', '(', 'L', 'w', 'H', 'J', ':', '£', '#', 'D', 'c', `'`, '=', '<', 'f', 'o', 'P', 'n', 'm', '6', 'N', ';', ']', 'v', 'F', '[', 'R', 'z', '!', ')', '+', 'Z', 'p', '9', '&', '{', 'i', 'h', 'I', 'q', '^', 'a', '8', 'g', 'l', 'E', '%', '4', 'G', 'K', '/', '>', ',', '$', 'T', '3', 'Q', '"', 'y', '1', '-', '*', ' ', 'W', 'e', 'C', '2', 'B', 'b', 'X', 'U', 'j', 'M', '.', 'k', 'Y', 'r', '~', 's', 'd', '_', 'x', '?', 'V', '7', 'O', '@', 'A', 'S', '5', '}'];

let key= keyJp;

window.onload = () => {
  const encryptButton = document.getElementById('encrypt-go') as HTMLButtonElement;
  const decryptButton = document.getElementById('decrypt-go') as HTMLButtonElement;
  const encryptInputText = document.getElementById("encrypt-message") as HTMLTextAreaElement;
  const encryptOutputText = document.getElementById("encrypt-response") as HTMLTextAreaElement;
  const decryptInputText = document.getElementById("decrypt-message") as HTMLTextAreaElement;
  const decryptOutputText = document.getElementById("decrypt-response") as HTMLTextAreaElement;
  const title = document.getElementById('title') as HTMLHeadingElement;
  const paragraph = document.getElementById('paragraph') as HTMLParagraphElement;
  const keySelect = document.getElementById('key-select') as HTMLSelectElement;


  keySelect.addEventListener('change', function handleChange(event) {
    if (keySelect.value === '1'){
      key = keyJp;
    } else if (keySelect.value === '2'){
      key = keySh;
  
    }
  }
  );

  encryptButton.addEventListener('click', function handleClick(event) {
    const encrypted = encrypt(encryptInputText.value);
    encryptOutputText.value = encrypted;
  });

  decryptButton.addEventListener('click', function handleClick(event) {
    const decrypted = decrypt(decryptInputText.value);
    decryptOutputText.value = decrypted;
  });

  // copy to clipboard
  const copyGo = document.querySelector('#copy-go') as HTMLButtonElement;
  const encryptResponse = document.querySelector('#encrypt-response') as HTMLTextAreaElement;

  copyGo.addEventListener('click', () => {
    encryptResponse.select();
    document.execCommand('copy');
  });

  // paste from clipboard
  const pasteGo = document.querySelector('#paste-go') as HTMLButtonElement;
  const decryptMessage = document.querySelector('#decrypt-message') as HTMLTextAreaElement;

  pasteGo.addEventListener('click', () => {
    navigator.clipboard.readText()
      .then(text => {
        decryptMessage.value = text;
      })
  });

  // DOM elements
  const swapGo = document.querySelector('#swap-go') as HTMLButtonElement;
  const content = document.querySelector('#content') as HTMLDivElement;

  // get data stored in localStorage and set up app
  let dark = false;

  if (localStorage.getItem('animated-icons-darkmode')) {
    dark = JSON.parse(localStorage.getItem('animated-icons-darkmode') || '');
  }

  if (dark) {
    content.classList.add('dark')
    encryptButton.classList.add('dark')
    decryptButton.classList.add('dark')
    encryptInputText.classList.add('dark')
    encryptOutputText.classList.add('dark')
    decryptInputText.classList.add('dark')
    decryptOutputText.classList.add('dark')
    copyGo.classList.add('dark')
    pasteGo.classList.add('dark')
    swapGo.classList.add('dark')
    title.classList.add('dark')
    paragraph.classList.add('dark')
    keySelect.classList.add('dark')
    swapGo.textContent = 'Dark';
    //icons.style.setProperty('--rotation', '180');
  }

  // Event listener on button
  swapGo.addEventListener('click', () => {
    content.classList.toggle('dark')
    encryptButton.classList.toggle('dark')
    decryptButton.classList.toggle('dark')
    encryptInputText.classList.toggle('dark')
    encryptOutputText.classList.toggle('dark')
    decryptInputText.classList.toggle('dark')
    decryptOutputText.classList.toggle('dark')
    copyGo.classList.toggle('dark')
    pasteGo.classList.toggle('dark')
    swapGo.classList.toggle('dark')
    title.classList.toggle('dark')
    paragraph.classList?.toggle('dark')
    keySelect.classList.toggle('dark')

    //const rotation = parseInt(getComputedStyle(icons).getPropertyValue('--rotation'))
    //icons.style.setProperty('--rotation', (rotation - 180).toString())
    dark = !dark
    if (dark) {
      swapGo.textContent = 'Light'
    } else {
      swapGo.textContent = 'Dark'
    }
    localStorage.setItem('animated-icons-darkmode', JSON.stringify(dark))
  })

}

// ENCRYPT
function encrypt(plainText: string): string {

  let cipherText = "";

  for (const letter of plainText) {
    const index = charsList.indexOf(letter);
    cipherText += key[index];
  }

  return cipherText;

};

// DECRYPT
function decrypt(cipherText: string): string {

  let plainText = "";

  for (const letter of cipherText) {
    const index = key.indexOf(letter);
    plainText += charsList[index];
  }

  return plainText;
};