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
        }
    }

    getFullName() {
        return this.title + " " + this.forename + " " + this.surname;
    }

    containsTag(tag) {
        return this.tags.some(x => x.toLowerCase() == tag.toLowerCase());
    }

}