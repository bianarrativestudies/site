class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList(members) {
        this.members = members;
        $("#member-list").html(members);
    }

    fetchData() {
        $.getJSON("../assets/data/member-data.json", function(data) {
            populateList(data);
        });
    }

    buildMembers() {
        
    }
}