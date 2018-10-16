export class Event {
    constructor(
        public title : String,
        public clasification : String,
        public type : String,
        public artists : any,
        public city : String,
        public place : String,
        public date : String,
        public hour : String,
        public description : String,
        public assistances : Number,
        public webpage : String,
        public dateCreated : Date,
        public del : Boolean,
        public image : String
    ){}
}; 