let questionList=[];
let questionCount = 0;
let answersArray = [];
let correctAnswer;
let correctAnswers=0;
let totalQuestions = 0;
let answeringQuestions = false;
$(document).ready (function() {
    let categoriesURL = "https://opentdb.com/api_category.php"
    
    $("#questionpage").hide();
    $("#resultspage").hide();
    $('#correct').hide();
    $('#incorrect').hide();
    $.ajax({
        url: categoriesURL,
        method: 'GET'
        
    }).done(function(responseJSON){
        var categoryHTML;
        for(var i=0; i< responseJSON.trivia_categories.length;i++)
        {
            
            categoryName = responseJSON.trivia_categories[i].name
            categoryId =responseJSON.trivia_categories[i].id
            categoryHTML = "<option value='" + categoryId +"'>"+ categoryName +"</option>"
            $('#category').append(categoryHTML);

        }
    }).always(function() {
        
    }).fail(function(error) {
        
    });

    $("#startbutton").click(function() {
        if($("#numberofquestions").val()>0)
        {
            var quizUrl;
            
            if($("#category").val() == "all")
            {
                quizUrl = "https://opentdb.com/api.php?amount="+ (Math.round($("#numberofquestions").val())) +"&difficulty="+$("#difficulty").val()+"&type=multiple"
            }
            else
            {
                quizUrl = "https://opentdb.com/api.php?amount="+ (Math.round($("#numberofquestions").val())) +"&category="+$("#category").val()+"&difficulty="+$("#difficulty").val()+"&type=multiple"
            }
            console.log(quizUrl)
            totalQuestions = $("#numberofquestions").val()
            $.ajax({
                url: quizUrl,
                method: 'GET'
                
            }).done(function(responseJSON){
                
                    
                if(responseJSON.results[0] != null &&responseJSON.results[0] != undefined)
                {
                    for(var i=0; i< responseJSON.results.length;i++ )
                    {
                        
                        let result = responseJSON.results[i]
                        console.log(result.question)
                        result.question = decodeHtml(result.question)
                        result.question = decode(result.question)
                        questionList.push(result)
                        console.log(result.question)
                    }
                    
                    $("#generatequiz").hide()
                    $("#questionpage").show()
                    newQuestion()
                }
                else
                {
                    alert("There are not enough questions in that category/difficulty")
                }
            }).always(function() {
                
            }).fail(function(error) {
                
            });
        }
        else{
            alert("Number of questions must be greater than 0 and must be a real number")
        }
        
        
    });
    $("#questionSubmitButton").click(function() {
        
        $("#generatequiz").hide()
        $("#questionpage").show()
        console.log($("input[name='answer']:checked").val())
        if(questionCount == questionList.length)
        {
            if($("input[name='answer']:checked").val()!= null && $("input[name='answer']:checked").val()!= undefined)
            {
                if($("input[name='answer']:checked").val() == correctAnswer)
                {
                    $('#correct').show(1).delay(1000).hide(1);
                    
                    correctAnswers++
                }
                else
                {
                
                    $('#incorrect').show(1).delay(1000).hide(1);
                    $('#incorrect').empty()
                    $('#incorrect').append(" The correct answer was: "+ correctAnswer)
                    
                }
            }
            
            else{
                alert("you must select an answer")
            }
            $("#generatequiz").hide()
            $("#questionpage").delay(1000).hide(1)
            showResults()
            $("#resultspage").delay(1000).show(1)

        }
        else
        {
            if($("input[name='answer']:checked").val()!= null && $("input[name='answer']:checked").val()!= undefined)
            {
                if($("input[name='answer']:checked").val() == correctAnswer)
                {
                    $('#correct').show(1).delay(1000).hide(1);
                    newQuestion()
                    correctAnswers++
                }
                else
                {
                
                    $('#incorrect').show(1).delay(1000).hide(1);
                    $('#incorrect').empty()
                    $('#incorrect').append(" The correct answer was: "+ correctAnswer)
                    newQuestion()
                }
            }
            
            else{
                alert("you must select an answer")
            }
        }
        
        
        


    });
    $("#playagain").click(function() {
            location.reload()

    });




});
function newQuestion()
{
    
    $("#question").text(questionList[questionCount].question)
    $("#questionheader").text("Question "+(questionCount +1) +":")
    correctAnswer = questionList[questionCount].correct_answer
    answersArray = []
    answersArray.push(questionList[questionCount].correct_answer)
    answersArray.push(questionList[questionCount].incorrect_answers[0])
    answersArray.push(questionList[questionCount].incorrect_answers[1])
    answersArray.push(questionList[questionCount].incorrect_answers[2])
    
    shuffle(answersArray)
    
    
    $("#questionForm").empty()
    $("#questionForm").append("<input id='option1' value='"+answersArray[0]+"' type='radio' name='answer'>"+answersArray[0]+"<br></br>")
    $("#questionForm").append("<input id='option2' value='"+answersArray[1]+"' type='radio' name='answer'>"+answersArray[1]+"<br></br>")
    $("#questionForm").append("<input id='option3' value='"+answersArray[2]+"' type='radio' name='answer'>"+answersArray[2]+"<br></br>")
    $("#questionForm").append("<input id='option4' value='"+answersArray[3]+"' type='radio' name='answer'>"+answersArray[3]+"<br></br>")
    questionCount++
    
    
}
function showResults()
{
    console.log(correctAnswers +"/"+ totalQuestions)
    $("#finalscore").text(correctAnswers +"/"+ totalQuestions)
}



//External Libraries


function shuffle(array) //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//https://github.com/Daplie/knuth-shuffle
{
        var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
    
}
//https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript
function decode(str)
{
    return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
    });
}
//http://jsfiddle.net/k65s3/
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}