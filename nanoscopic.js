var
  sagaware= require("sagaware")

function Nanoscopic( opts){
	if( this === global|| !this){
		return new Nanoscopic( opts)
	}
	this.saga= sagaware({})
	return this
}

Nanoscopic.prototype.register= function( name, service){
	var registered= this.saga.state.set( name, service)
	this.saga.putState( registered)
}

Nanoscopic.prototype.get= function( name){
	var factory= this.factory( name)
	if( name.endsWith( "!") || name.endsWith( "Factory")){
		return factory
	}
	return factory()
}

Nanoscopic.prototype.factory= function( name){
	var service= this.saga.state.get( name)
	if( service.data){
		return function(){
			return service.data
		}
	}else{
		return function(){
			return service()
		}
	}
}

module.exports= Nanoscopic
