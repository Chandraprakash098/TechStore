import React from 'react'
import Layout from '../components/Layout/Layout'

const AboutPage = () => {
  return (
    <Layout title={"About"}>
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About Us</h1>
          <p className="about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius
            urna id nulla mattis, at convallis justo blandit. Vivamus luctus
            dolor et tellus fermentum, quis ultrices purus consequat. Integer
            quis arcu nec neque finibus molestie. Aenean gravida congue turpis,
            ac vehicula velit euismod id. Curabitur rutrum mi in nibh vehicula
            blandit. Phasellus sed venenatis lectus, non interdum tellus. Donec
            vestibulum justo nisl, eget laoreet ante condimentum ut. Ut
            ultricies posuere libero, eget molestie lorem feugiat in.
            Pellentesque nec efficitur ipsum, a pellentesque tellus. Nullam
            viverra nisl nec purus ultrices convallis. Nullam ac lectus non nisi
            varius scelerisque. Donec eu rhoncus elit. Aliquam nec consequat
            est. Vivamus eu ante a magna egestas volutpat non a ante. In nec
            tellus in dolor euismod eleifend. Nulla non hendrerit ligula. Sed
            venenatis enim at ex pellentesque interdum. Cras luctus lobortis
            lorem nec commodo. Phasellus eget ultricies lorem. Phasellus eu diam
            rutrum, dignissim dui eu, tempus mi. Donec efficitur tincidunt
            lectus, eget luctus nunc varius sit amet. Nulla vitae leo purus.
            Nullam at odio id elit congue tempus. Quisque efficitur varius
            efficitur.  
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default AboutPage