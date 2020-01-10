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

        if (!tag) return true;

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

    getHtml() {
        const title = `<h2 class="member-institution">${this.institution} (${this.city})</h2>`;
        const name = `<h2 class="member-name">${this.title} ${this.forename} ${this.surname}</h2>`;
        const department = `<p class="member-department">${this.department}</p>`;
        const thesis = `<p class="member-thesis"><i>${this.thesis}</i></p>`;
        const site = `<p class="member-site"><a href="${this.webpage}">Visit Site</a></p>`;
        const tagsOpen = `<p class="member-tags">Research Interests: |`;

        let tags = ""

        this.tags.forEach(x => tags += ` <a onclick="filter('${x.toString()}')" class="member-tag">${x}</a> |`);

        const tagsClose = `</p>`;
        const hr = `<hr />`;

        return title + name + department + thesis + site + tagsOpen + tags + tagsClose + hr;
    }

}