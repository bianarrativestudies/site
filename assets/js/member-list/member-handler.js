class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList(members) {
        $("#member-list").html(members);
    }

    fetchData() {
        $.getJSON("../assets/data/member-data.json", function(data) {
            members = data;
            populateList(members);
        });
    }

    buildMembers() {
        
    }
}