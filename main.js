const keyBook = "KEY_BOOK";

//Proses Submit Buku Ke Storage
let x = [];
const inputStorageBook = () =>{
	const inputBookTitle = document.getElementById('inputBookTitle').value;
	const inputBookAuthor = document.getElementById('inputBookAuthor').value;
	const inputBookYear = document.getElementById('inputBookYear').value;
	const inputBookIsComplete = document.getElementById('inputBookIsComplete').checked;
	const data = {
		id: +new Date(),
		bookTitle : inputBookTitle,
		bookAuthor : inputBookAuthor,
		bookYear : inputBookYear,
		bookIsComplete : inputBookIsComplete
	};
	x.push(data);
	localStorage.setItem(keyBook, JSON.stringify(x));
}
const inputBook = document.getElementById('inputBook');
inputBook.addEventListener("submit", inputStorageBook);

///////////////////////////////////////////////////////////////////////////////////////////////

//Proses Load Data/Refresh Yang Telah Di Ubah
const loaded = () =>{
	const xObject = JSON.parse(localStorage.getItem(keyBook))||[];
	x = xObject;
	if (completeBookshelfList() != null) {
		completeBookshelfList()
	}
	if (incompleteBookshelfList() != null) {
		incompleteBookshelfList()
	}
}
window.addEventListener("load", loaded);
///////////////////////////////////////////////////////////////////////////////////////////////

//Proses Pencarian Buku
const searchingData = (event) =>{
	const searchBookTitle = document.getElementById('searchBookTitle').value;
	const dataBookObject = JSON.parse(localStorage.getItem(keyBook));
	const dataSearch = dataBookObject.filter((value)=> {
		return value.bookTitle.toLowerCase() == searchBookTitle.toLowerCase();
	});
	const htmlParse = `<b>Data Yang Anda Temukan Terdapat di ID : ${dataSearch[0].id}, Judul Buku ${dataSearch[0].bookTitle}, Pengarang Buku ${dataSearch[0].bookAuthor}, Tahun Terbit : ${dataSearch[0].bookYear} </b>`;
	document.getElementById("dataSearchFilter").innerHTML = htmlParse;
	event.preventDefault();
}
const searchBook = document.getElementById('searchBook');
searchBook.addEventListener("submit", searchingData)

///////////////////////////////////////////////////////////////////////////////////////////////


//Proses Filter incompleteBookshelfList
const incompleteBookshelfList = () =>{
	event.preventDefault();
	const dataBookObject = JSON.parse(localStorage.getItem(keyBook));
	if (dataBookObject != null) {
		const dataSearchFilter = dataBookObject.filter((value)=> {
			return value.bookIsComplete == false;
		});
		const dataSearchingan = dataSearchFilter.map((nilai)=>{
		let html = `<article class="book_item"> <h3>Book Title: ${nilai.bookTitle}</h3> <p>Penulis: ${nilai.bookAuthor}</p><p>Tahun: ${nilai.bookYear}</p><div class="action"><button class="green" onClick=cutInComp(${nilai.id})>Selesai di Baca</button><button class="red" onClick=delBookInComp(${nilai.id}) id="delBookIncomp">Hapus buku</button></div></article>`;
		document.getElementById('incompleteBookshelfList').innerHTML += html;
	});
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////

//Proses Hapus Data InCompleted Book
const delBookInComp = (nilai) =>{
	let el = null;
	let ind = null;
	const dell = x.find((element, index)=>{
		if (element.id == nilai) {
			el = element.id;
			ind = index;
		}
	})
	const yesOrNo = confirm("Yakin Ingin Menghapus ?");
	if (yesOrNo == true) {
		x.splice(ind, 1);
		localStorage.setItem(keyBook, JSON.stringify(x));
		window.location.reload();
	}
}


//Proses Filter completeBookshelfList
const completeBookshelfList = () =>{
	event.preventDefault();
	const dataBookObject = JSON.parse(localStorage.getItem(keyBook));
	if (dataBookObject != null) {
		const dataSearchFilter = dataBookObject.filter((value)=>{
			return value.bookIsComplete == true;
		});
		const dataSearchingan = dataSearchFilter.map((nilai)=>{
		let html = `<article class="book_item"> <h3>Book Title: ${nilai.bookTitle}</h3> <p>Penulis: ${nilai.bookAuthor}</p><p>Tahun: ${nilai.bookYear}</p><div class="action"><button class="green" onClick=cutComp(${nilai.id})>Belum selesai di Baca</button><button class="red" onClick=delBookComp(${nilai.id}) id="delBookComp">Hapus buku</button></div></article>`;
		document.getElementById('completeBookshelfList').innerHTML += html;
	});
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////

//Proses Hapus Data Completed Book
const delBookComp = (nilai) =>{
	let el = null;
	let ind = null;
	const dell = x.find((element, index)=>{
		if (element.id == nilai) {
			el = element.id;
			ind = index;
		}
	})
	const yesOrNo = confirm("Yakin Ingin Menghapus ?");
	if (yesOrNo == true) {
		x.splice(ind, 1);
		localStorage.setItem(keyBook, JSON.stringify(x));
		window.location.reload();
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////

//Proses Memindahkan Data Dari Complete ke Incomplet
const cutComp = (nilai) =>{
	let el = null;
	let toIncomp = false;
	const dell = x.find((element, index)=>{
		if (element.id == nilai) {
			element.bookIsComplete = toIncomp;
		}
	})
	localStorage.setItem(keyBook, JSON.stringify(x));
	window.location.reload();
}
///////////////////////////////////////////////////////////////////////////////////////////////

//Proses Memindahkan Data Dari Complete ke Incomplet
const cutInComp = (nilai) =>{
	let el = null;
	let toComp = true;
	const dell = x.find((element, index)=>{
		if (element.id == nilai) {
			element.bookIsComplete = toComp;
		}
	})
	localStorage.setItem(keyBook, JSON.stringify(x));
	window.location.reload();
}
///////////////////////////////////////////////////////////////////////////////////////////////