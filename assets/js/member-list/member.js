class Member {

    title = "";
    forename = "";
    surname = "";
    institution = "";
    city = "";
    department = "";
    thesis = "";
    webpage = "";

    tags = [];

    Member(data){
        console.log("Creating member with data " + data);
        this.title = data.title;
        this.forename = data.forename;
        this.surname = data.surname;
        this.institution = data.institution;
        this.city = data.city;
        this.thesis = data.thesis;
        this.department = data.department;
        this.webpage = data.webpage;
        this.tags = data.tags;
    }

    getFullName() {
        return this.title + " " + this.forename + " " + this.surname;
    }

    containsTag(tag) {
        for (i = 0; i < this.tags.length; i++) {
            if (tags[i].toLowerCase() == tag.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

}