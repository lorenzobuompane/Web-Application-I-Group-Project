import dayjs from 'dayjs';

function Film (id, title, favorite = false, dateOfWatching = null, rating = null) {
    this.id=id;
    this.title=title;
    this.favorite=favorite;
    this.dateOfWatching=dayjs(dateOfWatching);
    this.rating=rating;
}

function FilmLibrary () {
    this.library = [];
    
    this.addNewFilm=(film)=>{
        this.library.push(film);
    }

     this.sortByDate=()=> {
        const result= this.library.filter(a=>a.dateOfWatching.isValid()).sort( (a, b) =>  a.dateOfWatching.isBefore(b.dateOfWatching) ? 1: -1)
                .concat(this.library.filter(a=>!a.dateOfWatching.isValid()));
        return result;
    }

    this.getFavorites=()=>{
        const result = this.library.filter( film => film.favorite);   
        return result;
    } 

    this.getRated=()=>{
        const result = this.library.filter( a => a.rating!=null).sort( (a, b) => b.rating-a.rating );
        return result;
    }

    this.getFiveStars=()=>{
        const result = this.library.filter( a => a.rating===5);
        return result;
    }

    this.getLastMonth=()=>{
        const result=this.library.filter( (film) =>{
            if (film.dateOfWatching.isValid()) {
                if (dayjs().diff(film.dateOfWatching, 'd')<=30 && dayjs().diff(film.dateOfWatching, 'd')>=0) {
                    return true;
                }
                else {
                    return false;
                }
            } else {
                return false;
            }
        } );
        return result;
        
    }

    this.getUnseen=()=>{
        const result=this.library.filter((film)=>!film.dateOfWatching.isValid());
        return result;
    }

    this.deleteFilm=(id)=>{
        this.library = this.library.filter( (a) => a.id !== id );
    } 

    this.deleteFilmByName=(title)=>{
        this.library = this.library.filter( (a) => a.title !== title );
    }

    this.resetWatchedFilms=()=>{
        this.library.forEach( element => element.dateOfWatching=dayjs(null) );
    }


    this.print=()=>{ this.library.forEach( element => console.log(
        element.id, 
        element.title, 
        element.favorite, 
        element.dateOfWatching.toString()!=='Invalid Date' ? element.dateOfWatching.format('DD/MM/YYYY') : "---", 
        element.rating !== null ? element.rating : "---"));}

    this.getLibrary=()=>{return this.library};

    this.getNewId=()=>{ 
        return this.library[this.library.length-1].id+1;
     }
}

export {Film, FilmLibrary};