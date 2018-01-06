$(document).ready(function () {

    function getBooks() {

        var booksCollection = [];
        console.log("ready")
        //Pobranie danych z endpointy/books
        $.ajax({
            url: "http://localhost:8282/books/"
        }).done(function (books) {
            booksCollection = books;
            addBooksToHtml(books);

        })

    }

    function clearList() {
        var div2 = document.querySelectorAll(".btn");
        for (i = 1; i < div2.length; i++) {
            div2[i].remove();
        }
    }

    function clearDelButtons() {
        var conFluid = document.querySelectorAll('.container-fluid .container-fluid');
        for (i = 0; i < conFluid.length; i++) {
            conFluid[i].remove();
        }
    }

    function addBooksToHtml(books) {
        var row = $('.row');
        var rows = [];

        books.forEach(function (e, i) {
            var newRow = row.clone();

            console.log(newRow.children().eq(0).text('dane:'))
            console.log(newRow.children().eq(1).text(e.author))
            console.log(newRow.children().eq(4).text(e.isbn))
            console.log(newRow.children().eq(2).text(e.publisher))
            console.log(newRow.children().eq(3).text(e.type))
            console.log(newRow.children().eq(5).text('usun'));
            rows[i] = newRow;

            row.parent().append("<div id=" + i + " class='btn'><strong>" + e.title + "</strong></div>");
            row.parent().append("<div class='container-fluid' style='border-bottom: dashed 1px #000000'><div id=" + e.id + " class='del' style='color: red'>Usun</div></div>");

        });
        var btn = $('.btn');

        btn.on('click', function () {
            var div = $(this).next()[0];
            div.append(rows[$(this).attr('id')][0]).fadeIn('slow');
        })

        var del = $('.del');
        del.on('click', function () {
            var idTmp = $(this).attr('id');
            var myHeaders = new Headers({
                'content-type': 'aplication/json'
            });

            var myInit = {
                method: 'DELETE',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default'
            };

            fetch('http://localhost:8282/books/remove/' + idTmp, myInit).then(response => response.json());

            clearList();
            clearDelButtons();
            getBooks();
        });


    }

    var btnToSend = document.querySelector('#btnToSend');
    btnToSend.addEventListener('click', function () {
        var title = $('#title').val();
        var author = $('#author').val();
        var publisher = $('#publisher').val();
        var type = $('#type').val();
        var isbn = $('#isbn').val();

        var objToSend = {
            title: title,
            author: author,
            publisher: publisher,
            type: type,
            isbn: isbn
        }

        var myHeaders = new Headers({
            'content-type': 'aplication/json'
        })

        var myInit = {
            method: "POST",
            headers: myHeaders,
            mode: "cors",
            cache: "default",
            body: JSON.stringify(objToSend)
        };

        fetch("http://localhost:8282/books/add", myInit).then(function (response) {
            console.log(response);
        })
        
        clearList();
        getBooks();

    })

    getBooks();
})