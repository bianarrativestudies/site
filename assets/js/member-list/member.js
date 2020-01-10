class Member {

    title;
    forename;
    surname;
    email;
    institution;
    city;
    department;
    thesis;
    webpage;
    tags = [];
    letter;

    constructor(data) {
        if (data) {
            this.title = data.title;
            this.forename = data.forename;
            this.surname = data.surname;
            this.email = null;
            this.institution = data.institution;
            this.city = data.city;
            this.thesis = data.thesis;
            this.department = data.department;
            this.webpage = data.webpage;
            this.tags = data.tags;
            this.letter = data.letter ? data.letter : this.generateLetter(data);
        }
    }

    getFullName() {
        return this.title + " " + this.forename + " " + this.surname;
    }

    containsTag(tag) {
        return this.tags.some(x => x.toLowerCase() == tag.toLowerCase());
    }

    generateLetter(data) {
        if (data.city) {
            return data.city[0].toUpperCase();
        }

        if (data.institution) {
            return data.institution[0].toUpperCase();
        }

        return "";
    }

}