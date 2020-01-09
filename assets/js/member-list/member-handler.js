class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList() {
        $("#member-list").html("Member list");
    }

    fetchData() {
        $.getJSON("../assets/data/member-data.json", function(data) {
            console.log(data);
        });
    }

    buildMembers() {
        
    }
}