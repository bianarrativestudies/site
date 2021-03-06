class MemberHandler {

    constructor() {
        this.apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/1cAUkGbgaErzZ8QCCycsmtcpEr-8E97-8bOIBqThmawM/values/Members?key=AIzaSyDDEcHh6LUVMumtKM6-eJoYhvs5edHLzcQ";

        this.members = [];
        this.tags = [];
        this.letters = [];
    
        this.searchTerm = "";
        this.tag = "";
    
        this.sortedBySurname = true;
        this.sortedByInstitution = false;
        this.descending = false;
    }

    fetchData() {
        $.getJSON(this.apiUrl, data => {
            this.populateList(data.values);
        });
    }

    populateList(data) {

        this.members = [];

        // Remove headers
        data.splice(0, 1);

        // Remove unconfirmed
        data = data.filter(x => !x[12]);

        data.forEach(x => this.members.push(new Member(x)));

        console.log("Found " + this.members.length + " members.");

        this.renderAll();
    }

    renderAll() {
        // Get tag
        this.tag = (new URL(document.location)).searchParams.get("tag");

        // Get tags
        this.tags = this.getDistinctTags(this.members);

        // Get letters
        this.letters = this.getDistinctLetters(this.members);

        // filter by tag
        let filteredMembers = this.filterOnTag(this.members, this.tag);

        // filter by free text box
        filteredMembers = this.filterOnText(filteredMembers);

        // render members
        this.renderMembers(filteredMembers, this.letters);

        //render sorter
        this.renderSorter();

        //render tags
        this.renderTagList(this.tags);

        // render letter list
        this.renderLetterList(this.letters);
    }

    filterOnTag(members, tag) {
        return members.filter(x => x.containsTag(tag));
    }

    filterOnText(members) {

        if (!this.searchTerm) return members;

        const term = this.searchTerm.toLowerCase();

        return members.filter(x =>
            x.tags.some(y => y.toLowerCase().includes(term)) ||
            x.surname.toLowerCase().includes(term) ||
            x.city.toLowerCase().includes(term) ||
            x.forename.toLowerCase().includes(term) ||
            x.institution.toLowerCase().includes(term) ||
            x.department.toLowerCase().includes(term));
    }

    resetAll() {
        $('#member-text-filter').val(null);
        this.searchTerm = "";
        this.sortedBySurname = false;
        this.sortedByInstitution = false;
        this.descending = true;
        this.renderAll();
    }

    getDistinctTags(members) {
        return members
            .map(x => x.tags)
            .reduce((a, b) => a.concat(b), [])
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => a.localeCompare(b));
    }

    getDistinctLetters(members) {

        if (this.sortedBySurname) {
            return members
                .map(x => x.surname[0])
                .filter((value, index, self) => self.indexOf(value) === index)
                .sort((a, b) => a.localeCompare(b));
        } else {
            return members
                .map(x => x.letter)
                .filter((value, index, self) => self.indexOf(value) === index)
                .sort((a, b) => a.localeCompare(b));
        }
    }

    renderMembers(filteredMembers, letters) {

        if (this.descending) {
            letters = letters.reverse();
        }

        let content = "";

        for (var i = 0; i < letters.length; i++) {
            const letter = letters[i];

            let letterMembers = this.sortedBySurname ?
                filteredMembers.filter(x => x.surname[0] == letter) :
                filteredMembers.filter(x => x.letter == letter);

            letterMembers = letterMembers.sort((a, b) => {
                const first = a.surname.toLowerCase();
                const second = b.surname.toLowerCase();
                return (first < second) ? -1 : (first > second) ? 1 : 0;
            })

            content += `<a id=${letter}>${letter}</a><br><br>`;
            letterMembers.forEach(x => content += x.getHtml());
        }

        if (!content) {
            content = "<h3>No results for search term</h3>"
        }

        $("#member-list").html(content);
    }

    renderTagList(tags) {
        let content = "";

        content += `<a onclick="clearFilters()" class="member-tag">All</a> |`

        tags.forEach(x => {
            if (this.tag == x) {
                content += `<a onclick="getMembersWithTag('${x.toString()}')" class="member-tag"><b class="upper">${x}</b></a> |`;
            } else {
                content += `<a onclick="getMembersWithTag('${x.toString()}')" class="member-tag">${x}</a> |`;
            }
        })

        $("#tag-list").html(content);
    }

    renderLetterList(letters) {
        let content = "";

        letters.forEach(x => content += `<a onclick="jumpToLetter('${x.toString()}')" class="member-tag">${x}</a> `)

        $("#letter-list").html(content);
    }

    renderSorter() {
        const surname = (this.sortedBySurname ? `<b class="upper">Surname ${this.descending ? '(Descending)' : ""} </b>` : `Surname `)
        const institution = (this.sortedByInstitution ? `<b class="upper">Institution ${this.descending ? '(Descending)' : ""}</b>` : `Institution `)

        $("#sort-surname").html(surname);
        $("#sort-institution").html(institution);
    }

    sortBySurname() {

        this.descending = this.sortedBySurname ? !this.descending : false;

        this.sortedBySurname = true;
        this.sortedByInstitution = false;

        this.renderAll();
    }

    sortByInstitution() {

        this.descending = this.sortedByInstitution ? !this.descending : false;

        this.sortedBySurname = false;
        this.sortedByInstitution = true;

        this.renderAll();
    }

    // processForm(data) {

    //     let member = new Member();
    //     member.title = data[0].value;
    //     member.firstname = data[1].value;
    //     member.surname = data[2].value;
    //     member.email = data[3].value;
    //     member.institution = data[4].value;
    //     member.department = data[5].value;
    //     member.city = data[6].value;
    //     member.thesis = data[7].value;
    //     member.tags = data[8].value;

    //     let memberString = JSON.stringify(member);
    //     let code = btoa(memberString).toString("base64");
    //     console.log(code);

    //     $("#code-generated-label").html(`<b>Thanks! To complete the sign-up process, please send the code below to <a href="mailto:bianarrativestudies@gmail.com?subject=New%20Member&body=${code}">bianarrativestudies@gmail.com</a></b>`);
    //     $("#code-generated").html(code);
    // }
}