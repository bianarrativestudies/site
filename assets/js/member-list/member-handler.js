class MemberHandler {

    members = [];

    MemberHandler() {
        
    }

    populateList(members) {
        this.members = members;
        $("#member-list").html(members);
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