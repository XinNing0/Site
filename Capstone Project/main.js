
const app = angular.module('app', []);
app.controller('ctrl', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    // $scope.request = function () {
    //     $.get("http://localhost:3000/search?request=" + angular.uppercase($scope.name), function () {
    //     });
    // }

    $scope.trustSrc = (src) => {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.selectedPaper = [];
    $scope.papers = [];
    $scope.indexName = ['one', 'two', 'three', 'four', 'five', 'six']
    $scope.referenceCount = 0;
    $scope.featuredPapers = [];

    $('#h2-featured').html('Loading <b>Papers</b>');
    $http
        .get("/list")
        .then(function (response) {
            const data = response.data.data;
            console.log(`Received ${data.message.items.length} for starting`);
            $('#h2-featured').html('Featured <b>Papers</b>');
            for (let i = 0; i < 3; i++) {
                $scope.featuredPapers.push([]);
                for (let j = 0; j < 4; j++) {
                    const item = data.message.items[i * 4 + j];
                    const author = item.author[0];
                    $scope.featuredPapers[i].push({
                        name: item.title[0],
                        author: `${author.family}`,
                        year: item.created["date-parts"][0][0],
                        url: item.URL
                    })
                }
            }
        });

    $scope.shift = function () {
        console.log('clicked');
        const search = $('#searchBar').val();
        console.log(search);
        $("#searchBar").val("Loading...");
        $http
            .get("/search?request=" + angular.uppercase(search))
            .then(function (response) {
 
                const data = response.data.data;
                // console.log(data);
                console.log(`Received ${data.message.items.length} items`);

                const selectedPaperIndex = 0;
                for (;selectedPaperIndex < data.message.items.length; selectedPaperIndex++) {
                    if (data.message.items[selectedPaperIndex].reference) {
                        break;
                    } else {
                        $('#searchBar').val('No references found');
                        return;
                    }
                }

                const selectedPaper = data.message.items[0];
                const author = selectedPaper.author[0];
                $scope.selectedPaper.push({
                    name: selectedPaper.title[0],
                    author: `${author.family}`,
                    year: selectedPaper.created['date-parts'][0][0]
                });
                $scope.referenceCount = selectedPaper['references-count'];

                let i = 0;
                for (const ref of selectedPaper.reference) {
                    if (i > 5) break;
                    if (
                        !ref.author || 
                        !ref.year  || 
                        (
                            !ref['article-title'] && 
                            !ref['journal-title'] &&
                            !ref['volume-title']
                        )
                    ) {
                        continue;
                    }
                    $scope.papers.push({
                        name: ref['article-title'] || ref['journal-title'] || ref['volume-title'],
                        author: ref.author,
                        year: ref.year
                    });
                    i += 1;
                }

                // let first = true;
                // for (const item of data.message.items) {
                //     const author = item.author[0];
                //     if (first) {
                //         $scope.selectedPaper.push({
                //             name: item.title[0],
                //             author: `${author.family}, ${author.given}`,
                //             year: item.created["date-parts"][0][0],
                //         })
                //         first = false;
                //     } else {
                //         $scope.papers.push({
                //             name: item.title[0],
                //             author: `${author.family}, ${author.given}`,
                //             year: item.created["date-parts"][0][0],
                //         });
                //     }

                // }
                console.log($scope.papers.length);

                $(".fade").each(function (index) {
                    $(this).css("opacity", "0");
                    $("#searchBar").css("border", "none");
                    $("#searchBar").css("border-radius", "5px");
                
                
                    $(this).css("transition", "opacity linear 0.6s");
                  });
                
                  setTimeout(function(){
                        
                        $("#searchBar").css("width","14vw");
                        $("#searchBar").css("transition","width linear 0.6s");
                          setTimeout(function(){
                                $("#searchBar").css("margin","10vh 0 0 13vw");
                                $("#searchBar").css("transition","margin linear 0.6s");
                                setTimeout(function(){
                                      $("#searchBar").css("height","16vw");
                                      $("#searchBar").css("transition","height linear 0.6s");
                                      $(".show").each(function( index ){
                                        $(this).css("opacity", "1");
                                        $(this).css("transition", "opacity linear 0.6s");
                                      });
                                      setTimeout(function() {
                                        $("#searchBar").css("opacity", "0");
                                        $("#searchBar").css("transition", "opacity linear 0.6s");
                                        $('#searchBar').val("");
                                      }, 600);
                                 }, 600);
                           }, 600);
                   }, 600);
            })

        }

    console.log('yo');
    $(document).ready(function(){
        console.log('done');

    $(window).resize(function() {
        if($(window).width() < 700) {
            $("#moon").css("margin-right", "20px");
            $("#CitPage").css("margin-right", "10px");
            $("#HowPage").css("margin-right", "10px");
        }
        if($(window).width() >= 700) {
            $("#moon").css("margin-right", "25px");
            $("#CitPage").css("margin-right", "25px");
            $("#HowPage").css("margin-right", "25px");
        }
    });

    $(".wish-icon i").click(function(){
        $(this).toggleClass("fa-heart fa-heart-o");
    });

    $("#CitPage").click(function(){
        $("#citation_modal").css("display", "block");
    });

    $("#cit_close").click(function(){
        $("#citation_modal").css("display", "none");
    });

    // light Mode Local Storage Settings ————————————————————————————
    var lightMode = localStorage.getItem('lightMode');
    
    function enablelightMode(){
        // 1. Add class light mode to css
        $("body").addClass("light");
        $("header").addClass("light");
        $("#header-left").addClass("light");
        $("header a").addClass("light");
        $("#NewsFeed").addClass("light");
        $("#moon").addClass("light");
        $(".searchButton").addClass("light");
        $(".searchTerm").addClass("light");
        $(".carousel-control").addClass("light");
        $(".carousel-control:hover").addClass("light");
        $(".carousel .thumb-content .btn").addClass("light");
        $(".carousel .thumb-content .btn:hover").addClass("light");
        $(".carousel .thumb-content .btn:focus").addClass("light");
        $("#modal-content").addClass("light");

        // 2. Update lightMode to local storage
        localStorage.setItem('lightMode','enabled');

    }
    function disablelightMode(){
        // 1. Remove class light mode from css
        $("body").removeClass("light");
        $("header").removeClass("light");
        $("#header-left").removeClass("light");
        $("header a").removeClass("light");
        $("#NewsFeed").removeClass("light");
        $("#moon").removeClass("light");
        $(".searchButton").removeClass("light");
        $(".searchTerm").removeClass("light");
        $(".carousel-control").removeClass("light");
        $(".carousel-control:hover").removeClass("light");
        $(".carousel .thumb-content .btn").removeClass("light");
        $(".carousel .thumb-content .btn:hover").removeClass("light");
        $(".carousel .thumb-content .btn:focus").removeClass("light");
        $("#modal-content").removeClass("light");

        // 2. Update lightMode to local storage
        localStorage.setItem('lightMode',null);
    }
    if(lightMode == 'enabled'){
        enablelightMode();
    }
    $("#moon").click(function(){
        // Update variable
        lightMode = localStorage.getItem("lightMode");

        if(lightMode != "enabled"){
            enablelightMode();
        } else {
            disablelightMode();
        }
    });

});
}]);

