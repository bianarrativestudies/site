class MemberHandler {

    members = [];

    constructor() {

    }

    populateList(data) {

        this.members = [];

        data.forEach(x => this.members.push(new Member(x)));

        console.log("Found " + this.members.length + " members.");

        this.renderMembers(this.members);
    }

    fetchData() {
        $.getJSON("../assets/data/member-data.json", data => {
            this.populateList(data);
        });
    }

    renderMembers(filteredMembers) {

        let content = "";

        filteredMembers.forEach(x => content += this.getMemberForRender(x));

        if (!content) {
            content = "<h3>No results for search term</h3>"
        }

        $("#member-list").html(content);
    }

    getMemberForRender(member) {
        const title = `<h2 class="member-institution">${member.institution} (${member.city})</h2>`;
        const name = `<h2 class="member-name">${member.title} ${member.forename} ${member.surname}</h2>`;
        const department = `<p class="member-department">${member.department}</p>`;
        const thesis = `<p class="member-thesis"><i>${member.thesis}</i></p>`;
        const site = `<p class="member-site"><a href="${member.webpage}">Visit Site</a></p>`;
        const tagsOpen = `<p class="member-tags">Tags:`;

        let tags = ""

        member.tags.forEach(x => tags += ` <span class="member-tag">${x}</span>`);

        const tagsClose = `</p>`;
        const hr = `<hr />`;

        return title + name + department + thesis + site + tagsOpen + tags + tagsClose + hr;
    }

    sort() {

    }

    filterSurname(searchTerm) {
        if (searchTerm) {
            let filteredMembers = this.members.filter(x => x.surname.toLowerCase().includes(searchTerm.toLowerCase()));
            this.renderMembers(filteredMembers);
        } else {
            this.renderMembers(this.members);
        }
    }

    filterInstitute(searchTerm) {
        if (searchTerm) {
            let filteredMembers = this.members.filter(x => x.institution.toLowerCase().includes(searchTerm.toLowerCase()) || x.city.toLowerCase().includes(searchTerm.toLowerCase()));
            this.renderMembers(filteredMembers);
        } else {
            this.renderMembers(this.members);
        }
    }

    filterResearchArea(searchTerm) {
        if (searchTerm) {
            let filteredMembers = this.members.filter(x => x.tags.some(y => y.toLowerCase().includes(searchTerm.toLowerCase())));
            this.renderMembers(filteredMembers);
        } else {
            this.renderMembers(this.members);
        }
    }
}