class Member {

    title = "";
    forename = "";
    surname = "";
    institution = "";
    city = "";
    department = "";
    thesistitle = "";
    webpage = "";

    tags = [];

    Member(title, forename, surname, institution, city, department, thesistitle, webpage, tags){
        this.title = title;
        this.forename = forename;
        this.surname = surname;
        this.institution = institution;
        this.city = city;
        this.thesistitle = thesistitle;
        this.department = department;
        this.webpage = webpage;
        this.tags = tags;
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