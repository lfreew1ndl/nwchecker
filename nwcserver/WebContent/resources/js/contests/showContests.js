$(document).ready(function () {
    $('#contestTable').on('click-row.bs.table', function (e, row, $element) {
        console.log(JSON.stringify(row));

        var typeContest = row['type'];
        window.contestId = row['id'];

        $('#title-text').text(row['title']);
        $('#start_date').text(row['starts']);
        $('#duration').text(row['duration']/3600000);
        $('#type').text(typeContest['name']);
        $('#description').html(row['description']);

        switch (row['status']){
            case 'GOING': {
                $('.open-btn').show();
                $('#archive-btn').hide();
                $('#edit-group').hide();
            } break;
            case 'ARCHIVE': {
                $('#archive-btn').show();
                $('.open-btn').hide();
                $('#edit-group').hide();
            } break;
            case 'PREPARING': {
                $('#archive-btn').hide();
                $('.open-btn').hide();
                showEditGroup(row);
            } break;
            case 'RELEASE': {
                $('#archive-btn').hide();
                $('.open-btn').hide();
                $('#edit-group').hide();
            } break;
        }

        $('#contestModal').modal();
    });

    console.log(window.contestIsEdited);
});

function edited(contestId) {
    location.href = 'editContest.do?id=' + contestId;
}

function openContest(contestId) {
    location.href = 'passContest.do?id=' + contestId;
}

function archive(){
    location.href='etiam.do';
}

function statusFormatter(value, row) {
    rowStyle(row);
    switch (value){
        case 'GOING': {
            return '<span style="color:limegreen;">' + value + '</span>';
        }
        case 'ARCHIVE': {
            return '<span style="color:#ff0000;">' + value + '</span>';
        }
        case 'PREPARING': {
            return '<span style="color:cornflowerblue;">' + value + '</span>';
        }
        case 'RELEASE': {
            return '<span style="color:blue;">' + value + '</span>';
        }
    }
}

function rowStyle(row) {
    if(row['hidden']){
        return {
            classes: 'warning'
        };
    }
    return {};
}


function updateContestsList(){
    var selectVar = $('#selectOption').val();
    var radioVar = $('input:radio[name="radioOption"]:checked').val();

    $('#contestTable').bootstrapTable('destroy');
    $('#contestTable').bootstrapTable({
        method: 'get',
        url: 'contestListJson.do?hidden=' + radioVar + '&status=' + selectVar.toUpperCase()
    });
}

function showEditGroup(row){
    $.ajax({
        type: 'GET',
        url: 'checkContestIsEdited.do?id=' + row['id'],
        dataType:'text',
        success: function (response) {
            console.log('Success response!');
            updateEditGroup(response === 'true');
        },
        error: function() {
            console.log('Error response!');
        }
    });
}

function updateEditGroup(isEdit){
    $('#edit-group').show();
    if(isEdit){
        $('#now-edit').show()
        $('#edit-username').text('SOME USER');
        $('#edit-btn').show().attr('disabled','disabled');
    } else {
        $('#now-edit').hide();
        $('#edit-btn').show().removeAttr('disabled');
    }
}













