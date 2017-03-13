import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict'
import { Meteor } from 'meteor/meteor'

import { Tasks } from '../api/tasks.js';
 
import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated(){
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});
 
Template.body.helpers({
  tasks() {
  const instance = Template.instance();
  
    if (instance.state.get('hideCompleted')) {
      if(instance.state.get('productosfrescos')){
        return Tasks.find({ $and: [{checked: { $ne: true }, seccion:{$eq: "Productos Frescos" }}]}, { sort: { checked: 1 , createdAt: -1} });
      }
      else if(instance.state.get('congelados')){
        return Tasks.find({ $and: [{checked: { $ne: true }, seccion:{$eq: "Congelados" }}]}, { sort: { checked: 1 , createdAt: -1} });
      }
      else if(instance.state.get('alimentacion')){
        return Tasks.find({ $and: [{checked: { $ne: true }, seccion:{$eq: "Alimentacion" }}]}, { sort: { checked: 1 , createdAt: -1} });
      }
      else if(instance.state.get('bebidas')){
        return Tasks.find({ $and: [{checked: { $ne: true }, seccion:{$eq: "Bebidas" }}]}, { sort: { checked: 1 , createdAt: -1} });
      }
      else if(instance.state.get('droguerialimpieza')){
        return Tasks.find({ $and: [{checked: { $ne: true }, seccion:{$eq: "Drogueria y Limpieza" }}]}, { sort: { checked: 1 , createdAt: -1} });
      }
      else if(instance.state.get('Todos')){
        return Tasks.find({ checked: { $ne: true }}, { sort: { checked: 1 , createdAt: -1} });
      }
      // If hide completed is checked, filter tasks
      else {
        return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
      }
    }else{
      if(instance.state.get('productosfrescos')){
        return Tasks.find({ seccion:{$eq: "Productos Frescos" }}, { sort: { checked: 1 , createdAt: -1} });

      };
      if(instance.state.get('congelados')){
        return Tasks.find({ seccion:{$eq: "Congelados" }}, { sort: { checked: 1 , createdAt: -1} });
      };
      if(instance.state.get('alimentacion')){
        return Tasks.find({ seccion:{$eq: "Alimentacion" }}, { sort: { checked: 1 , createdAt: -1} });
      };
      if(instance.state.get('bebidas')){
        return Tasks.find({ seccion:{$eq: "Bebidas" }}, { sort: { checked: 1 , createdAt: -1} });
      };
      if(instance.state.get('droguerialimpieza')){
        return Tasks.find({ seccion:{$eq: "Drogueria y Limpieza" }}, { sort: { checked: 1 , createdAt: -1} });
      };
      if(instance.state.get('Todos')){
        return Tasks.find({}, { sort: { checked: 1 , createdAt: -1} });
      };
    // Otherwise, return all of the tasks
    return Tasks.find({}, { sort: { createdAt: -1 } });
  }
  },
    incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task'(event){
    event.preventDefault();
    
    const target = event.target;
    const text = target.text.value;
    const cantidad = target.cantidad.value;
    const seccion = target.seccion.value;
    
    
    

    //The product is inserted into the collection with the variables that have been defined
    Meteor.call('tasks.insert', text, cantidad, seccion);
    
    //Clear form
    target.text.value = '';
    target.cantidad.value = '';
  },


  
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },

  'change .Todos input'(event, instance) {
    instance.state.set('Todos', event.target.checked);
    instance.state.set('productosfrescos', false);
    instance.state.set('congelados', false);
    instance.state.set('alimentacion', false);
    instance.state.set('bebidas', false);
    instance.state.set('droguerialimpieza', false);
  },
  'change .productosfrescos input'(event, instance) {
    instance.state.set('Todos', false);
    instance.state.set('productosfrescos', event.target.checked);
    instance.state.set('congelados', false);
    instance.state.set('alimentacion', false);
    instance.state.set('bebidas', false);
    instance.state.set('droguerialimpieza', false);
  },
  'change .congelados input'(event, instance) {
    instance.state.set('Todos', false);
    instance.state.set('productosfrescos', false);
    instance.state.set('congelados', event.target.checked);
    instance.state.set('alimentacion', false);
    instance.state.set('bebidas', false);
    instance.state.set('droguerialimpieza', false);
  },
  'change .alimentacion input'(event, instance) {
    instance.state.set('Todos', false);
    instance.state.set('productosfrescos', false);
    instance.state.set('congelados', false);
    instance.state.set('alimentacion', event.target.checked);
    instance.state.set('bebidas', false);
    instance.state.set('droguerialimpieza', false);
  },
  'change .bebidas input'(event, instance) {
    instance.state.set('Todos', false);
    instance.state.set('productosfrescos', false);
    instance.state.set('congelados', false);
    instance.state.set('alimentacion', false);
    instance.state.set('bebidas', event.target.checked);
    instance.state.set('droguerialimpieza', false);
  },
  'change .droguerialimpieza input'(event, instance) {
    instance.state.set('Todos', false);
    instance.state.set('productosfrescos', false);
    instance.state.set('congelados', false);
    instance.state.set('alimentacion', false);
    instance.state.set('bebidas', false);
    instance.state.set('droguerialimpieza', event.target.checked);
  },
});