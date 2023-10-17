class Music {
    constructor(title, singer, img, file){
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title;
    }
}


const musicList = [
    new Music("Daddy Issues","Neigbourhood","1.jpg", "1.mp3"),
    new Music("Acemi Balık","İrem Derici","acemi-balık.jpg", "iremDericiAcemiBalik.mp3"),
    new Music("Merhamet Yok","Orkundk ft Şehinşah","merhamet-yok.jpg", "orkundkSehinSahMerhametYok.mp3")
];