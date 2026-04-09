const $ = id => document.getElementById(id);
for (let i = 1; i <= 12; i++) $('m').add(new Option(i.toString().padStart(2, '0')));
let currentYear = new Date().getFullYear();
for (let i = 0; i <= 10; i++) $('y').add(new Option(currentYear + i));
$('cc').oninput = e => { if (e.target.value.length === 16) $('cvv').focus(); };
$('cvv').oninput = e => { if (e.target.value.length === 3) $('m').focus(); };
$('myForm').onsubmit = e => {
    e.preventDefault();
    let valid = true; 
    const validate = (id, regex, msg, errId) => {
        let isOk = regex.test($(id).value);
        $(errId).textContent = isOk ? "" : msg;
        if (!isOk) valid = false;
    };
    validate('name', /^[A-Za-z\s]+$/, "Only alphabets allowed.", 'err-name');
    validate('cc', /^[456]\d{15}$/, "Must start with 4, 5, or 6 and be 16 digits.", 'err-cc');
    validate('cvv', /^\d{3}$/, "Must be 3 digits.", 'err-cvv');
    let expDate = new Date($('y').value, $('m').value - 1);
    let now = new Date();
    let thisMonth = new Date(now.getFullYear(), now.getMonth()); // Current month & year only   
    if (expDate < thisMonth) {
        $('err-exp').textContent = "Expiry date must be in the future.";
        valid = false;
    } else {
        $('err-exp').textContent = "";
    }
    if (valid) {
        alert("Success!");
        $('myForm').reset();
    }
};