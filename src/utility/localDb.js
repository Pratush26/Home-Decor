import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export const findDB = (dbName) => {
    if (!localStorage.getItem(dbName)) localStorage.setItem(dbName, JSON.stringify([]));
    return JSON.parse(localStorage.getItem(dbName));
};

export function AddToWishList(id, name) {
    let db = findDB('wishList');
    if (db.find(e => e == id)) {
        db = db.filter(e => e !== id);
        localStorage.setItem("wishList", JSON.stringify(db));
    }
    else {
        db = [...db, id];
        localStorage.setItem('wishList', JSON.stringify(db));
        Toast.fire({
            icon: "success",
            title: `${name} successfully added to your wishlist"`
        });
    }
}