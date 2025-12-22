extends CharacterBody2D

var x_speed: float
var y_speed: float

func _ready():
	var rng = RandomNumberGenerator.new()
	rng.randomize() 
	
	x_speed = rng.randf_range(-200.0, 200.0)
	y_speed = rng.randf_range(-200.0, 200.0)

func _physics_process(_delta):
	velocity = Vector2(x_speed, y_speed)
	move_and_slide()
