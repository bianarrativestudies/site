class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList(data) {

        this.members = [];

        data.forEach(x => this.members.push(new Member(x)));

        console.log("Loaded " + this.members.length + " members.");
        console.log("First: " + this.members[0]);
        $("#member-list").html(this.members[0].getFullName());
    }

    fetchData() {
        $.getJSON("../assets/data/member-data.json", data => {
            this.populateList(data);
        });
    }

    buildMembers() {
        
    }
}