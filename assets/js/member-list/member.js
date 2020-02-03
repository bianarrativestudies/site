class Member {

    forename;
    surname;
    email;
    institution;
    department;
    thesis;
    webpage;
    tags = [];
    letter;

    constructor(data) {
        if (data) {
            this.forename = data[1];
            this.surname = data[2];
            this.email = null;
            this.institution = data[3];
            this.department = data[4];
            this.thesis = data[5];
            this.webpage = data[10];
            this.tags = this.generateTags(data);
            this.letter = data[14] ? data[14] : "-";
        }
    }

    getFullName() {
        return this.forename + " " + this.surname;
    }

    generateTags(data) {
        let splitTags = [];

        let approaches = data[6].split(',');
        let media = data[7].split(',');
        let fields = data[8].split(',');
        let topics = data[9].split(',');
        let other = data[11].split(';').filter(x => x.length > 0);

        approaches = approaches.map(x => x.trim());
        media = media.map(x => x.trim());
        fields = fields.map(x => x.trim());
        topics = topics.map(x => x.trim());
        other = other.map(x => x.trim());

        approaches.forEach(x => splitTags.push(x));
        media.forEach(x => splitTags.push(x));
        fields.forEach(x => splitTags.push(x));
        topics.forEach(x => splitTags.push(x));
        other.forEach(x => splitTags.push(x));

        return splitTags;
    }

    containsTag(tag) {

        if (!tag) return true;

        return this.tags.some(x => x.toLowerCase() == tag.toLowerCase());
    }

    getHtml() {
        const title = `<h2 class="member-institution">${this.institution}</h2>`;
        const name = `<h2 class="member-name">${this.forename} ${this.surname}</h2>`;
        const department = `<p class="member-department">${this.department}</p>`;
        const thesis = this.thesis ? `<p class="member-thesis">Thesis title: <i>${this.thesis}</i></p>` : "";
        const site = this.webpage ? `<p class="member-site"><a href="${this.webpage}">Visit Webpage</a></p>` : "";
        const tagsOpen = `<p class="member-tags">Research Interests: |`;

        let tags = ""

        this.tags.forEach(x => tags += ` <a onclick="getMembersWithTag('${x.toString()}')" class="member-tag">${x}</a> |`);

        const tagsClose = `</p>`;
        const hr = `<hr />`;

        return name + title + department + thesis + site + tagsOpen + tags + tagsClose + hr;
    }

}