class MemberHandler {

    members = [];
    tags = [];

    sortedBySurname = false;
    sortedByInstitution = false;
    sortedByCity = false;
    descending = true;

    constructor() {

    }

    populateList(data) {

        this.members = [];

        data.forEach(x => this.members.push(new Member(x)));

        this.tags = this.getDistinctTags(this.members);

        console.log("Found " + this.members.length + " members.");

        const tag = (new URL(document.location)).searchParams.get("tag");

        $('#member-research-filter').val(tag);
        // $('#member-list-title').html(`Members (${this.members.length})`);

        this.filterResearchArea(tag);
        this.renderSorter();
    }

    fetchData() {
        $.getJSON("../assets/data/member-data.json", data => {
            this.populateList(data);
        });
    }

    processForm(data) {

        let member = new Member();
        member.title = data[0].value;
        member.firstname = data[1].value;
        member.surname = data[2].value;
        member.email = data[3].value;
        member.institution = data[4].value;
        member.department = data[5].value;
        member.city = data[6].value;
        member.thesis = data[7].value;
        member.tags = data[8].value;

        let memberString = JSON.stringify(member);
        let code = btoa(memberString).toString("base64");
        console.log(code);

        $("#code-generated-label").html(`<b>Thanks! Please send the code below to <a href="mailto:bianarrativestudies@gmail.com">bianarrativestudies@gmail.com</a> to complete the sign up process</b>`);
        $("#code-generated").html(code);
    }

    getDistinctTags(data) {
        return data
        .map(x => x.tags)
        .reduce((a, b) => a.concat(b), [])
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => a.localeCompare(b));
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
        const tagsOpen = `<p class="member-tags">Research Interests: |`;

        let tags = ""

        member.tags.forEach(x => tags += ` <a onclick="filter('${x.toString()}')" class="member-tag">${x}</a> |`);

        const tagsClose = `</p>`;
        const hr = `<hr />`;

        return title + name + department + thesis + site + tagsOpen + tags + tagsClose + hr;
    }

    renderSorter() {
        const surname = (this.sortedBySurname ? `<b>Surname ${this.descending ? '(Descending)' : ""} </b>` : `Surname `)
        const institution = (this.sortedByInstitution ? `<b>Institution ${this.descending ? '(Descending)' : ""}</b>` : `Institution `)
        const city = (this.sortedByCity ? `<b>City ${this.descending ? '(Descending)' : ""}</b>` : `City`)

        $("#sort-surname").html(surname);
        $("#sort-institution").html(institution);
        $("#sort-city").html(city);
    }

    sortBySurname() {

        this.sortedBySurname = true;
        this.sortedByInstitution = false;
        this.sortedByCity = false;
        this.descending = !this.descending;

        let sortedMembers = this.members.sort((a, b) => a.surname.localeCompare(b.surname));

        if (this.descending) {
            sortedMembers.reverse();
        }

        this.renderMembers(sortedMembers);
        this.renderSorter();
    }

    sortByInstitution() {
        
        this.sortedBySurname = false;
        this.sortedByInstitution = true;
        this.sortedByCity = false;
        this.descending = !this.descending;

        let sortedMembers = this.members.sort((a, b) => a.institution.localeCompare(b.institution));

        if (this.descending) {
            sortedMembers.reverse();
        }

        this.renderMembers(sortedMembers);
        this.renderSorter();
    }

    sortByCity() {
        
        this.sortedBySurname = false;
        this.sortedByInstitution = false;
        this.sortedByCity = true;
        this.descending = !this.descending;

        let sortedMembers = this.members.sort((a, b) => a.city.localeCompare(b.city));

        if (this.descending) {
            sortedMembers.reverse();
        }

        this.renderMembers(sortedMembers);
        this.renderSorter();
    }

    filterSurname(searchTerm) {

        const filteredMembers = searchTerm ? this.members.filter(x => x.surname.toLowerCase().includes(searchTerm.toLowerCase())) : this.members;

        this.renderMembers(filteredMembers);
    }

    filterInstitute(searchTerm) {
        const filteredMembers = searchTerm ?
            this.members.filter(x => x.institution.toLowerCase().includes(searchTerm.toLowerCase()) || x.city.toLowerCase().includes(searchTerm.toLowerCase()))
            : this.members;

        this.renderMembers(filteredMembers);
    }

    filterResearchArea(searchTerm) {

        const filteredMembers = searchTerm ? this.members.filter(x => x.tags.some(y => y.toLowerCase().includes(searchTerm.toLowerCase()))) : this.members;

        this.renderMembers(filteredMembers);
    }
}