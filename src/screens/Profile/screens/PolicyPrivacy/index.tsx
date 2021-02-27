import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Header from '~/components/Header';
import { useTheme } from '~/contexts/ThemeContext';
import useAnimatedHeader from '~/hooks/useAnimatedHeader';
import useStyles from '~/hooks/useStyles';

import getStyles from './styles';

const PolicyPrivacy = () => {
  const styles = useStyles(getStyles);
  const { palette } = useTheme();
  const { translateY } = useAnimatedHeader();

  return (
    <View style={styles.container}>
      <Header
        translateY={translateY}
        title={'Privacy Policy'}
        backgroundColor={palette.backgroundPrimary}
        elevation={5}
        showSearch={false}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.description}>
          The terms “Pax,” “we,” “us,” and “our” include Pax, Inc. All other
          terms not defined in this Privacy Policy will have the meanings set
          forth in the Pax, Inc. End User License Agreement and Terms of
          Service(“EULA”) . This Privacy Policy explains how Pax may collect,
          use, process, disclose and safeguard information we obtain through the
          our mobile applications. It also tells you about your rights and
          choices with respect to your Personal Information, and how you can
          contact us if you have any questions or concerns. If you are a
          California resident, please also see our California Resident Privacy
          Notice.
        </Text>
        <Text style={styles.title}>HOW PAX COLLECTS YOUR INFORMATION</Text>
        <Text style={styles.description}>
          For the purpose of this Privacy Policy,
          <Text style={styles.bold}>“Personal Information”</Text> means any
          information relating to an identified or identifiable individual. We
          obtain Personal Information relating to you from various sources as
          described below. Where applicable, we indicate whether and why you
          must provide us with your Personal Information, as well as the
          consequences of failing to do so. If you do not provide Personal
          Information when requested, you may not be able to benefit from our
          Service if that information is necessary to provide you with the
          Service or if we are legally required to collect it.
          {'\n\n'}
          <Text style={styles.bold}>A. Personal Information Provided by</Text>
          {'\n\n'}
          <Text style={styles.bold}>
            You Account Registration and Profile Creation.
          </Text>{' '}
          If you register to use the Service, then you must provide us with your
          name, date of birth, a password and email address in order to create
          an account and user profile. You may also optionally add to your
          profile certain demographic information, such as your country, zip
          code and gender, as well as your photo. If you are a broadcaster, we
          ask you for information about your station and broadcast(s) when you
          register on our Service, including your name, email address, phone
          number, website, content streaming URL, as well as background
          information on the station and broadcast(s).{'\n\n'}
          <Text style={styles.bold}>Subscriptions.</Text> If you obtain a
          Subscription to the Service, then we will ask you to provide payment
          information, such as your credit card number, so our service providers
          can process your payments for the Service. {'\n\n'}
          <Text style={styles.bold}>Communications.</Text> We will collect any
          information which you provide to us through your communications with
          our customer-support team. If you subscribe to our newsletter, then we
          will collect certain information from you, such as your email address.
          {'\n\n'}
          <Text style={styles.bold}>
            B. Personal Information Obtained from Third Parties
          </Text>
          {'\n\n'}
          <Text style={styles.bold}>Social Sign-on.</Text> We collect
          information from social media services when you use your credentials
          for these services to log into the Service. For example, when you log
          in with your Facebook credentials, we collect the information you have
          authorized Facebook to share with us, such as your name, email
          address, gender, date of birth, and profile picture. We may also
          obtain other non-public information with your permission.{'\n\n'}
          <Text style={styles.bold}>Other Third Parties.</Text> We may collect
          information about you from other third parties, such as other users or
          our marketing partners. For example, we may receive information about
          you when another user allows us to upload your contact information to
          the Service. We may combine this information with the other
          information we collect about you.
          {'\n\n'}
          <Text style={styles.bold}>
            C. Personal Information Collected From your Device via Automated
            Means
          </Text>
          {'\n\n'}
          <Text style={styles.bold}>Using the Service.</Text> When you use the
          Service, we collect information about your activities, such as the
          stations, artists or channels that you listen to, the User profiles
          that you view, your searches for friends or stations and your other
          actions and interactions with other Users or content on the Service,
          the stations, content and people that you follow (“Follow Lists”),
          your comments, any content that you post on the Service, and any other
          information resulting from your use of the Service that is publicly
          accessible by other Users (“Public Information”).
          {'\n\n'}
          <Text style={styles.bold}>Location Information.</Text> With your
          consent, we may obtain information about your physical location at
          regular intervals when you use the Service, such as by use of
          geolocation features in the device(s) through which you access the
          Service. In addition, we may infer your location from other
          information we collect (for example, your IP address indicates the
          general geographic region from which you are connecting to the
          Internet). We use location information to comply with radio stations’
          content licenses (which are location-specific), and to provide you
          with features, notifications, advertising, or other content that is
          influenced by your location (such as showing you your local radio
          station).
          {'\n\n'}
          <Text style={styles.bold}>Device Information.</Text> We receive
          information from Users’ devices through which a User accesses the
          Service, such as IP address, web browser type, mobile operating system
          version, and unique device identifiers.
        </Text>
        <Text style={styles.title}>HOW PAX USES YOUR INFORMATION</Text>
        <Text style={styles.description}>
          <Text style={styles.bold}>Internal and Service-Related Usage.</Text>{' '}
          We use Personal Information for internal and Service-related purposes,
          including to operate, provide, and maintain the Service.
          {'\n\n'}
          <Text style={styles.bold}>
            Analytics and Improving the Service.
          </Text>{' '}
          We and our service providers use Personal information that we collect
          on the Service, such as your location and your activities on the
          Service, to monitor and analyze usage of the Service and to improve
          and enhance the Service.
          {'\n\n'}
          <Text style={styles.bold}>Communications.</Text> We may send emails to
          an email address you provide to us (i) for customer-service or
          technical-support purposes, or (ii) to send you (a) information about
          topics or content that we think may interest you, or (b) updates about
          the latest developments or features on the Service. We also may send
          push notifications to your device and a newsletter to the email
          address you provide to us in the event that you subscribe to receive
          the newsletter.
          {'\n\n'}
          <Text style={styles.bold}>Advertising.</Text> We and our advertising
          partners may use your Personal Information, including your location
          and your activities on the Service to facilitate the delivery of
          advertisements.
          {'\n\n'}
          <Text style={styles.bold}>Tailored Content.</Text> We may use your
          Personal Information to provide you with personalized services,
          content, offers and recommendations. For example, we may analyze your
          listening history to recommend similar content that we think would be
          of particular interest to you, send you tailored recommendations based
          on your location or send you personalized marketing communications
          based on Personal Information we have collected about you.
          {'\n\n'}
          <Text style={styles.bold}>Aggregate Data.</Text> We may de-identify
          and aggregate information collected through the Service for
          statistical analysis and other lawful purpose.
          {'\n\n'}
          <Text style={styles.bold}>Legal.</Text> We may use your Personal
          Information to enforce our EULA, to defend our legal rights, or to
          comply with our legal obligations and internal policies. If you are
          located in the European Economic Area (“EEA”):
          {'\n\n'}• We only process your Personal Information based on a valid
          legal ground, including when you have consented to the use of your
          Personal Information, for example, to provide you with tailored
          advertising.
          {'\n\n'}• We need your Personal Information to provide you with the
          Services, including for account registration, to respond to your
          inquiries or, if you are a broadcaster, to manage the directory
          listing and for support.
          {'\n\n'}• We have a legal obligation to use your Personal Information,
          such as the obligation to protect intellectual property rights and
          restrict content available on the Service based on your location.
          {'\n\n'}• We or a third party have a legitimate interest in using your
          Personal Information. In particular, we have a legitimate interest in
          using your Personal Information to personalize our Service and provide
          you with tailored content, conduct business analytics and otherwise
          improve the safety, security, and performance of our Service. We only
          rely on our or a third party’s legitimate interests to process your
          Personal Information when these interests are not overridden by your
          rights and interests.
        </Text>
        <Text style={styles.title}>HOW PAX MAY DISCLOSE YOUR INFORMATION</Text>
        <Text style={styles.description}>
          <Text style={styles.bold}>Publishers.</Text> We may share certain
          types of Personal Information with Publishers who provide the content
          you listen to on our Service. This may include information such as
          your device or cookie identifiers, device type, user agent, IP
          address, and zip code.
          {'\n\n'}
          <Text style={styles.bold}>Other Users.</Text> Your Public Information,
          which includes your Follow Lists, is viewable by other Users. Your
          profile information, such as any photographs, your username, and any
          content that you post in your account, is also viewable by other
          Users. We are not responsible for the privacy practices of other
          Users. Accordingly, we recommend that you carefully consider what you
          post to the Service before doing so.
          {'\n\n'}
          <Text style={styles.bold}>Other Third Parties.</Text> We may also
          share Personal Information about you with other third parties in the
          following circumstances:
          {'\n\n'}• With Your Consent. We may disclose your Personal Information
          with your permission. We may seek your permission in various ways. For
          example, we may present you with an “opt-in” prompt when you register
          to use the Service or access certain content
          {'\n\n'}• To Comply with Legal Obligations. We may access, preserve,
          and disclose your Personal Information or other account information if
          we believe doing so is required or appropriate to (i) comply with
          laws, law enforcement requests, and legal process, such as a court
          order or subpoena; (ii) respond to your requests; or (iii) protect
          your, our or others’ rights, property, or safety.
          {'\n\n'}• In case of Merger, Sale, or Other Asset Transfers. If we are
          involved in a merger, acquisition, financing due diligence,
          reorganization, bankruptcy or liquidation where the business will not
          continue as a going concern, receivership, sale of Pax assets, or
          transition of the Service to another provider, then your information
          may be sold or transferred as part of such a transaction as permitted
          by law and/or contract. The use of your information following any of
          these events should be governed by the provisions of this Privacy
          Policy in effect at the time the applicable information was collected.
        </Text>
        <Text style={styles.title}>SECURITY OF YOUR INFORMATION</Text>
        <Text style={styles.description}>
          We maintain administrative, technical and physical safeguards that are
          intended to appropriately protect Personal Information against
          accidental or unlawful destruction, accidental loss, unauthorized
          alteration, unauthorized disclosure or access, misuse, and any other
          unlawful form of processing of the Personal Information in our
          possession. Unfortunately, the Internet cannot be guaranteed to be
          100% secure, and we cannot ensure or warrant the security of any
          Personal Information you provide to us.
        </Text>
        <Text style={styles.title}>DATA RETENTION</Text>
        <Text style={styles.description}>
          We take measures to delete your Personal Information or keep it in a
          form that does not permit identifying you when this information is no
          longer necessary for the purposes for which we process it, unless we
          are required by law to keep this information for a longer period. When
          determining the retention period, we take into account various
          criteria, such as the type of products and services requested by or
          provided to you, the nature and length of our relationship with you,
          possible re-enrollment with our products or services, the impact on
          the services we provide to you if we delete some information from or
          about you and mandatory retention periods provided by law and the
          statute of limitations.
        </Text>
        <Text style={styles.title}>THIRD PARTY PRIVACY PRACTICES</Text>
        <Text style={styles.description}>
          This Privacy Policy applies only to the processing of your Personal
          Information by Pax. The Service may contain links to third party
          sites, such as third party content providers (“Third Party Sites”).
          The policies and procedures described in this Privacy Policy do not
          apply to Third Party Sites. The links from the Service to any Third
          Party Sites do not imply that we endorse or have reviewed the Third
          Party Sites.
        </Text>
        <Text style={styles.title}>CHILDREN’S PRIVACY</Text>
        <Text style={styles.description}>
          We do not knowingly collect, maintain, or use personal information, as
          defined by the Federal Trade Commission’s Children’s Online Privacy
          Protection Act Rule, from children under 13 years of age, and no part
          of the Service is directed to children under the age of 13. If you are
          located in the EEA, we do not knowingly collect, maintain, or use
          Personal Information from children under 16 years of age, and no part
          of the Service is directed to children under the age of 16. If you
          learn that your child has provided us with Personal Information
          without your consent, then you may alert us at support@pax.com. If we
          learn that we have collected any Personal Information from children
          under 13 (or 16 in the EEA), then we will promptly take steps to
          delete such information and terminate the child’s account.
        </Text>
        <Text style={styles.title}>DATA TRANSFERS</Text>
        <Text style={styles.description}>
          If you are visiting the Service from regions with laws governing data
          collection and use, then please note that you are agreeing to the
          transfer of your Personal Information to the United States and
          processing globally. By providing your Personal Information to the
          Service, you consent to any transfer and processing in accordance with
          this Policy. If you are located in the EEA, we comply with EU data
          protection law when transferring your Personal Information outside of
          the EEA. In particular, we may transfer your Personal Information to
          non-EEA countries, including to the United States where we are
          headquartered. To protect Personal Information transferred from the
          EEA or Switzerland to the United States. we have certified to the
          EU-U.S. and Swiss-U.S. Privacy Shield frameworks. To learn more, read
          our Privacy Shield Policy.
        </Text>
        <Text style={styles.title}>PRIVACY OPTIONS AND SETTINGS</Text>
        <Text style={styles.description}>
          <Text style={styles.bold}>Account Information.</Text> Once you have
          registered for the Service, you may change your profile settings in
          your account on the Service. For example, you can change the email
          address and password associated with your account and you may choose
          to keep your Follow Lists private. If you are a broadcaster, you can
          change the information you provided to us by contacting us per the
          information below.
          {'\n\n'}
          <Text style={styles.bold}>Follow Lists.</Text> Once you have
          registered for the Service, you may change your profile information at
          any time to make your Follow Lists private. If you registered for the
          Service prior to May 7, 2014, then your Follow Lists will be private
          until you sign in to your account, at which time they will be made
          public.
          {'\n\n'}
          <Text style={styles.bold}>Devices.</Text> You can access the Service
          from multiple devices if you sign into your account on the devices or
          register them on the Service. If you would like to disconnect your
          account from any of these devices, you can unregister the device
          through your account settings on the Service.
          {'\n\n'}
          <Text style={styles.bold}>Location Information.</Text> You can prevent
          us from collecting location information from your device by changing
          the settings on your device, if your device allows you to do so;
          however, if you do not provide us with location information you may
          not be able to fully use the Service. Please note that we will
          continue to receive your IP address and use it as described above to
          determine, for example, your location to comply with our licensing
          agreements.
          {'\n\n'}
          <Text style={styles.bold}>Opt-out.</Text> Each marketing email
          communication we send you will contain instructions permitting you to
          “opt-out” of receiving future marketing communications. You may also
          contact us as indicated below to have your name deleted from our email
          mailing lists, or you may update your communication preferences in
          your account settings on our Website. Please note, however, that
          certain communications, such as push notifications, require you to
          change the settings on your device if you wish not to receive any
          future communications. In addition, on occasion we may send
          service-related announcements, such as disruption notifications, via
          email and you may not be able to opt-out of these communications.
          {'\n\n'}
          <Text style={styles.bold}>Audience Information.</Text> When you use
          our app, The Nielsen Company (US), LLC and Comscore, Inc. collect
          information on behalf of Pax about your use of the Service. If you
          wish to opt out of Nielsen’s digital measurement research, please
          visit the links to the Nielsen measurements in the app settings.
          {'\n\n'}
          <Text style={styles.bold}>Do Not Track.</Text> Some web browsers
          incorporate a “Do Not Track” feature. Because there is not yet an
          accepted standard for how to respond to Do Not Track signals, our
          Website does not currently respond to such signals.
        </Text>
        <Text style={styles.title}>
          YOUR DATA PROTECTION RIGHTS (EUROPEAN ECONOMIC AREA).
        </Text>
        <Text style={styles.description}>
          If you are located in the EEA or Switzerland, you may have the
          following additional rights to:
          {'\n\n'}• Request access to and receive information about the Personal
          Information we maintain about you, to update and correct inaccuracies
          in your Personal Information, restrict or to object to the processing
          of your Personal Information, have the information anonymized or
          deleted, as appropriate, or exercise your right to data portability to
          easily transfer your Personal Information to another company. In
          addition, you may also have the right to lodge a complaint with a
          supervisory authority, including in your country of residence, place
          of work or where an incident took place.
          {'\n\n'}• Withdraw any consent you previously provided to us regarding
          the processing of your Personal Information, at any time and free of
          charge. We will apply your preferences going forward and this will not
          affect the lawfulness of the processing before your consent
          withdrawal. Those rights may be limited in some circumstances by local
          law requirements. You may exercise these rights by using the How to
          Contact Us below.
        </Text>
        <Text style={styles.title}>
          CHANGES TO OUR PRIVACY POLICY AND PRACTICES
        </Text>
        <Text style={styles.description}>
          <Text style={styles.bold}>Posting of Revised Privacy Policy.</Text> We
          will post any adjustments to the Privacy Policy on this web page, and
          the revised version will be effective when it is posted. If you are
          concerned about how your information is used, then bookmark this page
          and read this Privacy Policy periodically.
          {'\n\n'}
          <Text style={styles.bold}>New Uses of Information.</Text> From time to
          time, we may desire to use or disclose Personal Information for uses
          not previously disclosed in our Privacy Policy. If our practices
          change regarding previously collected information in a way that would
          be materially less restrictive than stated in the version of this
          Privacy Policy in effect at the time we collected the information,
          then we will make reasonable efforts to provide notice and obtain
          consent prior to any such uses as may be required by law.
          {'\n\n'}
          <Text style={styles.bold}>Contact Information.</Text>
          If you have any questions, would like to exercise your rights or share
          suggestions for improving the Privacy Policy or the Service, or
          otherwise would like to contact us, then please feel free to contact
          us per the information below.
          {'\n\n'}
          <Text style={styles.bold}>Pax, Inc.</Text>
          {'\n'}
          <Text>support@pax.com</Text>
          {'\n\n'}
          <Text style={styles.description}>
            If you are located in the EEA and would like to raise a question to
            us about your Personal Information, or otherwise exercise your
            rights in respect of your Personal Information, then you may also
            contact our data protection representative.
          </Text>
          <Text style={styles.description}>
            {'\n\n'}Last Updated Date: February 27, 2021
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default memo(PolicyPrivacy);
