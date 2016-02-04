import StartApp.Simple exposing (start)
import Html exposing (..)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Html.Events exposing (onClick)
import Http
import Json.Decode as Json
import Task

main =
  start
    { model = update "req"
    , update = update
    , view = view
    }

-- Model

type alias Croc = {
  nature : Bool,
  jambon : Bool,
  tomate : Bool
  }

type alias Commande = {
  name : String,
  menu : String,
  croc1 : Croc,
  croc2 : Croc,
  prix : Int,
  payer : Bool,
  servi : Bool,
  heure : Int, 
  date : String
  }

type alias Model = List Commande


-- Update

type alias Action = String
--update : Action -> Model -> Model
update action model =
  Http.post (Json.at [] Json.string) "/reservation/view" Http.empty 

--view

view : Signal.Address Action -> Model -> Html
view address model = 
  case model of
  t::r ->
    div [] [
      h1 [] [text "Prochain :"],
      div [] [dispCommande t],
      h2 [] [text "Suivant :"],
      div [] [dispSuite r],
      button [onClick address "req" ] [text "test"]
    ]

dispSuite : Model -> Html
dispSuite liste = 
  List.map dispCommande liste
    |> div []

dispCommande : Commande -> Html
dispCommande commande =
  case commande.menu of
    "0" ->  div [][
        h2 [] [text commande.name],
        p [] [text ("Croc1 :" ++ (dispCroc commande.croc1))],
        p [] [text ("Croc2 :" ++ (dispCroc commande.croc2))]
      ]
    "1" ->  div [][
        h2 [] [text commande.name],
        p [] [text ("Simple :" ++ (dispCroc commande.croc1))]
      ]
    "2" ->  div [][
        h2 [] [text commande.name],
        p [] [text ("Choco :" ++ (dispChoco commande.croc1))]
      ]
  
dispCroc : Croc -> String
dispCroc croc =
  (if croc.nature 
    then "nature" 
    else "complet"
  )
  ++" "++
  (if croc.jambon 
    then "jambon" 
    else "poulet"
  )
  ++" "++
  (if croc.tomate 
    then "avec" 
    else "sans"
  )
  ++" tomate."

dispChoco : Croc -> String
dispChoco croc =
  (if croc.jambon 
    then "avec" 
    else "sans"
  )
  ++" poire"++
  (if croc.tomate 
    then "avec" 
    else "sans"
  )
  ++" banane."
