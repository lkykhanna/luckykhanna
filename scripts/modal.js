$(document).ready(function() {
    // MODAL
    var modalText = {
        zinexu: {
            title: 'Zinexu',
            tag: 'A sustainable energy source',
            detail: 'Zinexu is a startup idea for finding a energy source which provides clean and green energy by padeling only.',
            link: 'http://www.zinexu.rf.gd/'
        },
        arduino: {
            title: 'IOT project',
            tag: 'Talking, walking and sensing based toy.',
            detail: 'This is a toy named Sarathi developed by me and my team for Toycathon 2021. ',
            link: 'https://youtu.be/Bu4-BocyEss'
        },
        blogspot: {
            title: 'Blogspot webiste',
            tag: 'Writing is my passion',
            detail: 'This website is just in order to give answers to basic question of my near and dear ones. Go and check once...',
            link: 'https://www.lucky-khanna.blogspot.com'
        },
        piet: {
            title: 'PietAssignments',
            tag: 'Notes website',
            detail: 'This is a website to provide free of cost notes to every engineering student. This is a learning place so join us.',
            link: 'http://www.pietassignments.com'
        },
        
      
    };

    $('#gallery .button').on('click', function() {
        fillModal(this.id);
        $('.modal-wrap').addClass('visible');
    });

    $('.close').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    $('.mask').on('click', function() {
        $('.modal-wrap, #modal .button').removeClass('visible');
    });

    var carousel = $('#carousel'),
        slideWidth = 700,
        threshold = slideWidth / 3,
        dragStart,
        dragEnd;

    setDimensions();

    $('#next').click(function() {
        shiftSlide(-1);
    });
    $('#prev').click(function() {
        shiftSlide(1);
    });

    carousel.on('mousedown', function() {
        if (carousel.hasClass('transition')) return;
        dragStart = event.pageX;
        $(this).on('mousemove', function() {
            dragEnd = event.pageX;
            $(this).css('transform', 'translateX(' + dragPos() + 'px)');
        });
        $(document).on('mouseup', function() {
            if (dragPos() > threshold) {
                return shiftSlide(1);
            }
            if (dragPos() < -threshold) {
                return shiftSlide(-1);
            }
            shiftSlide(0);
        });
    });

    function setDimensions() {
        if (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            slideWidth = $(window).innerWidth();
        }
        $('.carousel-wrap, .slide').css('width', slideWidth);
        $('.modal').css('max-width', slideWidth);
        $('#carousel').css('left', slideWidth * -1);
    }

    function dragPos() {
        return dragEnd - dragStart;
    }

    function shiftSlide(direction) {
        if (carousel.hasClass('transition')) return;
        dragEnd = dragStart;
        $(document).off('mouseup');
        carousel
            .off('mousemove')
            .addClass('transition')
            .css('transform', 'translateX(' + direction * slideWidth + 'px)');
        setTimeout(function() {
            if (direction === 1) {
                $('.slide:first').before($('.slide:last'));
            } else if (direction === -1) {
                $('.slide:last').after($('.slide:first'));
            }
            carousel.removeClass('transition');
            carousel.css('transform', 'translateX(0px)');
        }, 700);
    }

    function fillModal(id) {
        $('#modal .title').text(modalText[id].title);
        $('#modal .detail').text(modalText[id].detail);
        $('#modal .tag').text(modalText[id].tag);
        if (modalText[id].link)
            $('#modal .button')
            .addClass('visible')
            .parent()
            .attr('href', modalText[id].link);

        $.each($('#modal li'), function(index, value) {
            $(this).text(modalText[id].bullets[index]);
        });
        $.each($('#modal .slide'), function(index, value) {
            $(this).css({
                background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
                backgroundSize: 'cover'
            });
        });
    }
});