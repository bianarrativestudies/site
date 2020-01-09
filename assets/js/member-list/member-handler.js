class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList(data) {

        this.members = [];

        for (var i = 0; i < data.length; i++) {
            this.members.push(new Member(data[i]));
        }

        console.log("Loaded " + this.members.length + " members.");
        console.log("First: " + this.members[0].getFullName());
        $("#member-list").html(this.members[0].getFullName());
    }

    fetchData() {
        var handler = this;
        $.getJSON("../assets/data/member-data.json", function(data) {
            handler.populateList(data);
        });
    }

    buildMembers() {
        
    }
}