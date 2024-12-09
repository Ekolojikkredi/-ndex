const puanlama = {
    pil: 10,
    kagit: 5,
    plastik: 3,
    cam: 7,
    metal: 8
};

let ogrenciKayitlar = [];
let atikKayitlar = [];

function showPage(pageId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';

    if (pageId === 'kayit-form') {
        document.getElementById('ogrenci-kayit').style.display = 'none';
        document.getElementById('okul-kayit').style.display = 'none';
        const kayitTuru = document.getElementById('kayit-turu').value;
        if (kayitTuru === 'ogrenci') {
            document.getElementById('ogrenci-kayit').style.display = 'block';
        } else if (kayitTuru === 'okul') {
            document.getElementById('okul-kayit').style.display = 'block';
        }
    }
}

document.getElementById('kayit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const kayitTuru = document.getElementById('kayit-turu').value;

    if (kayitTuru === 'ogrenci') {
        const ad = document.getElementById('ogrenci-ad').value;
        const soyad = document.getElementById('ogrenci-soyad').value;
        const ogrenciNo = document.getElementById('ogrenci-no').value;

        const ogrenci = { ad, soyad, ogrenciNo, atiklar: [] };
        ogrenciKayitlar.push(ogrenci);
        alert('Öğrenci kaydedildi!');
        showPage('kayit-form'); // Go back to the form
    } else if (kayitTuru === 'okul') {
        const okulAdi = document.getElementById('okul-ad').value;
        alert(`${okulAdi} okul kaydedildi!`);
        showPage('kayit-form'); // Go back to the form
    }
});

document.getElementById('atik-girisi').addEventListener('submit', function(event) {
    event.preventDefault();
    const atikTuru = document.getElementById('atik-turu').value;
    const miktar = parseFloat(document.getElementById('miktar').value);
    const kayitYapan = document.getElementById('kayit-yapan').value;
    const ogrenciNo = document.getElementById('ogrenci-numara').value;

    const ogrenci = ogrenciKayitlar.find(ogrenci => ogrenci.ogrenciNo === ogrenciNo);
    if (ogrenci) {
        const puan = puanlama[atikTuru] * miktar;
        ogrenci.atiklar.push({ atikTuru, miktar, puan, kayitYapan, tarih: new Date().toLocaleDateString() });
        alert('Atık kaydedildi!');
        showPage('veri-girisi'); // Go back to the data entry page
    } else {
        alert('Öğrenci bulunamadı!');
    }
});

function veriGoruntule() {
    const ogrenciNo = document.getElementById('okul-no').value;
    const ogrenci = ogrenciKayitlar.find(ogrenci => ogrenci.ogrenciNo === ogrenciNo);

    const atikKayitlariTbody = document.getElementById('atikkayitlari').getElementsByTagName('tbody')[0];
    atikKayitlariTbody.innerHTML = '';

    if (ogrenci) {
        ogrenci.atiklar.forEach(atik => {
            const row = atikKayitlariTbody.insertRow();
            row.insertCell(0).textContent = atik.tarih;
            row.insertCell(1).textContent = atik.atikTuru;
            row.insertCell(2).textContent = atik.miktar;
            row.insertCell(3).textContent = atik.puan;
            row.insertCell(4).textContent = atik.kayitYapan;
        });
    } else {
        alert('Öğrenci kaydı bulunamadı.');
    }
}

document.getElementById('kayit-turu').addEventListener('change', function() {
    showPage('kayit-form');
});
