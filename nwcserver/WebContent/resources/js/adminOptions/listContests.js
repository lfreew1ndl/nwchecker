/**
 * Created by ReaktorDTR on 07.02.2015.
 */

$(document).ready(function () {
    $('#contestsData').on('click-row.bs.table', function (e, row, $element) {
        var contestId = row['id'];      
        id.value = contestId;
        $('#ContestUserTable').bootstrapTable('destroy');
        $.getJSON('getContestUsersList.do?contestId=' + contestId, function (data) {
            $('#ContestUserTable').bootstrapTable({
                data: data
            });
        });
        $.get('getContestStatus.do?contestId=' + contestId, function (contest) {
            $("input[name=radioStatus]").prop("disabled",false);
            $("input[name=radioStatus]").val([contest.statusContest]);
            if(contest.statusContest=="ARCHIVE") {
                $("input[id=rbGoing]").prop("disabled",true);
                $("input[id=rbPreparing]").prop("disabled",true);
                $("input[id=rbRelease]").prop("disabled",true);
            }
            if (contest.contestHidden) {
                $('input[id=chbHidden]').prop('checked', true);
            } else {
                $('input[id=chbHidden]').prop('checked', false);
            }

        });
        tryToShowContestInfo();
    });

    $('body').on("click", "#submitUserListButton", function () {
        sendContestInfo();
    });
});

function sendContestInfo() {
    //collect users data:
    var fields = $('#userListModal tbody tr');
    var data = collectContestData(fields);
    //check if even one user avaible in List:
    if (checkUserList(data) == true) {
        //send data:
        sendContestData(data);
    }
}

function checkUserList(data) {
    if (data.userIds.length == 0) {
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_WARNING,
            title: emptyUserListHeader,
            message: emptyUserListBody,
            buttons: [{
                label: btnSubmit,
                cssClass: 'btn-primary',
                action: function (dialogItself) {
                    data["userIds[]"] = "-1";
                    sendContestData(data);
                    dialogItself.close();
                }
            }, {
                label: btnClose,
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }
            ]
        });
        return false;
    } else {
        return true;
    }
}

function sendContestData(data) {
    $.ajax({
        'type': 'POST',
        'url': 'setContestStatus.do',
        'data': data,
        success: function (response) {
            if (response.status == "SUCCESS") {
                sendContestUsers(data);
            }
            if (response.status == "FAIL") {
                if (response.errorMessageList[0].fieldName == "denied") {
                    showAccessDeniedModal();
                }
            }
        }
    });
}

function sendContestUsers(data) {
    $.ajax({
        'type': 'POST',
        'url': 'setContestUsers.do',
        'data': data,
        success: function (response) {
            if (response.status == "SUCCESS") {
                $('#userListModal').modal('hide');
                BootstrapDialog.show({
                    title: successCaption,
                    type: BootstrapDialog.TYPE_SUCCESS,
                    message: contestUserListSuccess,
                    onhidden: function (dialogRef) {
                        $('#contestsData').bootstrapTable('refresh');
                    }
                });
            }
            if (response.status == "FAIL") {
                if (response.errorMessageList[0].fieldName == "denied") {
                    showAccessDeniedModal();
                }
            }
        }
    });
}

function collectContestData(fields) {
    var data = {};
    var data1 = [];
    //set contest Id:
    data["contestId"] = $('#id').val();
    data["contestStatus"] = $('input:radio[name=radioStatus]:checked').val();
    data["contestHidden"] = $('#chbHidden').is(':checked');
    //get data from tbody:
    $('tbody tr').each(function () {
        if ($(this).hasClass('selected')) {
            data1.push($(this).find('.idField').html());
        }
    });
    data["userIds"] = data1;
    return data;
}

function tryToShowContestInfo() {
    if ($('#id').val() != '0') {
        $('#userListModal').modal();
    }
}