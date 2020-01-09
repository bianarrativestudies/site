class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList(members) {
        this.members = members;
        console.log("Loaded " + members.length + " members.");
        $("#member-list").html(members[0].name);
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