<template>
  <div>
    <admin-header></admin-header>
    <div class="rounded-0 border-dark px-2 px-md-5 py-5 mx-md-5 my-md-5" id="content" style="background-color: #ffffff; box-shadow: 20px 20px 50px 10px black;">
        <form method="post" class="container-fluid" action="admin-addsuccess.html">
            <h2 class="text-center">Add Course</h2>

            <div class="form-row">
                <div class="form-group col-md-4">
                    <label class="text-left" for="CCode">Course Code</label>
                    <input class="form-control" type="text" id="CCode" name="CCode" required="" placeholder="Course Code">
                </div>
                <div class="form-group col-md-4">
                    <label class="text-left" for="CSection">Course Section</label>
                    <input class="form-control" type="text" id="CSection" name="CSection" placeholder="Section" required="">
                </div>
                <div class="form-group col-md-4">
                    <label class="text-left" for="CSlots">Number of Slots</label>
                    <input class="form-control" type="number" id="CSlots" placeholder="Number of Slots" name="CSlots">
                </div>
            </div>
            <div class="form-group">
                <label class="text-left" for="CName">Course Name</label>
                <input class="form-control" type="text" id="CName" name="CName" placeholder="Course Name" required="">
            </div>
            <div class="form-group">
                <label class="text-left" for="CProf">Tentative Professor</label>
                <input class="form-control" type="text" id="CProf" name="CProf" placeholder="Tentative Professor" required="">
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    <label class="text-left" for="CRoom">Room</label>
                    <input class="form-control" type="text" id="CRoom" name="CRoom" placeholder="Room" required="">
                </div>
                <div class="col-md-3">

                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CSTime">Start Time</label>
                    <input class="form-control" id="CSTime" type="time" required="" name="CSTime">
                </div>
                <div class="form-group col-md-3">
                    <label class="text-left" for="CETime">End Time</label>
                    <input class="form-control" id="CETime" type="time" required="" name="CETime">
                </div>
            </div>
            <div class="form-group"><label>Usual Days for Course (Check all that apply)</label>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="monday"><label class="form-check-label" for="monday">Monday</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="tuesday"><label class="form-check-label" for="tuesday">Tuesday</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="wednesday"><label class="form-check-label" for="wednesday">Wednesday</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="thursday"><label class="form-check-label" for="thursday">Thursday</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="friday"><label class="form-check-label" for="friday">Friday</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="saturday"><label class="form-check-label" for="saturday">Saturday</label></div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="sunday"><label class="form-check-label" for="sunday">Sunday</label></div>
            </div>
            <button class="btn btn-success" id="submit" type="submit">Add Course</button>
            <button class="btn btn-danger" id="submit" type="submit" v-if="edit==true">Add Course</button>
        </form>
    </div>
  </div>
</template>


<script>
import Header from '../components/admin-header.vue'

export default {
  components: {
    'admin-header': Header
  },
  data(){
    return {
      edit: true
    }
  }
}
</script>


<style scoped>

</style>