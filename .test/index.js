#!/usr/bin/env node
"use strict"

var
  nanoscopic= require( ".."),
  tape= require( "tape")

tape( "data object", function(t){
	var fixture= nanoscopic()
	fixture.register( "hello", {data:"world"})
	var helloGet= fixture.get( "hello"),
	  helloFactory= fixture.factory( "hello")()
	t.equal( helloGet, "world", "can get a data object through a get")
	t.equal( helloFactory, "world", "can get data object from factory")
	t.end()
})

tape( "function object", function(t){
	var
	  fixture= nanoscopic(),
	  i= 0
	fixture.register( "hello", function(){ return "world" + i++ })
	var
	  factory1= fixture.factory( "hello"),
	  get1= fixture.get( "hello"),
	  factory2= fixture.factory( "hello"),
	  factory2get2= factory2(),
	  get3= fixture.get( "hello"),
	  factory2get4= factory2(),
	  factory1get5= factory1()
	t.equal( get1, "world0", "can get hello world")
	t.equal( factory2get2, "world1", "can factory hello world")
	t.equal( get3, "world2", "can get hello world after factory")
	t.equal( factory2get4, "world3", "can factory hello world")
	t.equal( factory1get5, "world4", "can factory hello world")
	t.end()
})
