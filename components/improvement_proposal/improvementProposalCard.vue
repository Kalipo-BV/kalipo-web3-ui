<template>
  <div>
   
    <div  class="white" style="width: 300px; margin-right: 30px; padding-left: 20px; padding-top: 10px; border-radius: 7px; padding-bottom: 10px; display: flex;">
       <div style="width: 90%;">
          <p style="color: #0F6AF1;" class="text-h1 mb-2">{{ message }}</p>
          <div>
            <p class="mb-0">Priority: 2</p>
            <p class="mb-0">Votes: 8</p>
          </div>
       </div>
       <div class="d-flex align-center" style="width: 10%;">
        <p class="font-weight-regular"  style="color:#0F6AF1; margin-bottom: 0px; font-size: xx-large;">></p>
       </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: {
    message: String
  }

}
</script>
