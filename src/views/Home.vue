<template>
  <div class="home">
    <!-- <Category /> -->
    <FloatingButton />  
    <DateFilter />  
  </div>
</template>

<script>
// @ is an alias to /src
import FloatingButton from '@/components/FloatingButton';
// import Category from '@/components/Category';
import DateFilter from '@/components/DateFilter';

export default {
  name: 'Home',
  components: {
    FloatingButton,
    // Category,
    DateFilter,
  }
}
</script>
